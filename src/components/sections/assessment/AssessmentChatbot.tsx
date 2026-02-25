import { useCallback, useEffect, useRef, useState } from "react";
import ChatWindow from "./ChatWindow";
import FreeTextInput from "./FreeTextInput";
import ProgressBar from "./ProgressBar";
import ReportView from "./ReportView";
import ResumePrompt from "./ResumePrompt";
import type { ChatMessage, StoredSession } from "./types";

const STORAGE_KEY = "n6-assessment-session";
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
const API_BASE =
	import.meta.env?.PUBLIC_ASSESSMENT_API_URL || "http://localhost:8000";

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

function loadSession(): StoredSession | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const session: StoredSession = JSON.parse(raw);
		const age = Date.now() - new Date(session.startedAt).getTime();
		if (age > SESSION_MAX_AGE_MS) {
			localStorage.removeItem(STORAGE_KEY);
			return null;
		}
		return session;
	} catch {
		localStorage.removeItem(STORAGE_KEY);
		return null;
	}
}

function saveSession(session: StoredSession) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
	} catch {
		// localStorage full or unavailable, silently ignore
	}
}

function clearSession() {
	localStorage.removeItem(STORAGE_KEY);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type Phase = "loading" | "resume-prompt" | "chat" | "report";

export default function AssessmentChatbot() {
	const [phase, setPhase] = useState<Phase>("loading");
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [leadData, setLeadData] = useState<Record<string, string>>({});
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [report, setReport] = useState<ReportPayload | null>(null);

	const sessionIdRef = useRef(sessionId);
	sessionIdRef.current = sessionId;

	// Persist to localStorage after each update
	const persist = useCallback(
		(
			sid: string,
			msgs: ChatMessage[],
			ld: Record<string, string>,
			prog: number,
			startedAt?: string,
		) => {
			saveSession({
				sessionId: sid,
				messages: msgs,
				leadData: ld,
				progress: prog,
				startedAt: startedAt || new Date().toISOString(),
				lastMessageAt: new Date().toISOString(),
			});
		},
		[],
	);

	// -----------------------------------------------------------------------
	// API helpers
	// -----------------------------------------------------------------------

	const startConversation = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${API_BASE}/api/conversations`, {
				method: "POST",
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			const sid = data.session_id;
			const msg: ChatMessage = data.message;
			const prog = msg.metadata?.progress ?? 0;
			setSessionId(sid);
			setMessages([msg]);
			setProgress(prog);
			setPhase("chat");
			persist(sid, [msg], {}, prog);
		} catch {
			setError("Could not connect to the assessment agent. Please try again.");
			setPhase("chat");
		} finally {
			setIsLoading(false);
		}
	}, [persist]);

	const resumeConversation = useCallback(
		async (stored: StoredSession) => {
			setIsLoading(true);
			setError(null);
			try {
				const res = await fetch(
					`${API_BASE}/api/conversations/${stored.sessionId}`,
				);
				if (res.status === 404) {
					// Session expired on server
					clearSession();
					await startConversation();
					return;
				}
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data = await res.json();
				setSessionId(data.session_id);
				setMessages(data.messages);
				setLeadData(data.lead_data || {});
				setProgress(data.progress);

				// Check if report was already generated
				const lastMsg = data.messages[data.messages.length - 1];
				if (lastMsg?.metadata?.is_report && lastMsg.metadata.report) {
					setReport(lastMsg.metadata.report);
					setPhase("report");
				} else {
					setPhase("chat");
				}

				persist(
					data.session_id,
					data.messages,
					data.lead_data || {},
					data.progress,
					stored.startedAt,
				);
			} catch {
				// Fall back to stored messages
				setSessionId(stored.sessionId);
				setMessages(stored.messages);
				setLeadData(stored.leadData);
				setProgress(stored.progress);
				setPhase("chat");
			} finally {
				setIsLoading(false);
			}
		},
		[persist, startConversation],
	);

	const sendMessage = useCallback(
		async (content: string) => {
			const sid = sessionIdRef.current;
			if (!sid || isLoading) return;

			const userMsg: ChatMessage = { role: "user", content };
			setMessages((prev) => [...prev, userMsg]);
			setIsLoading(true);
			setError(null);

			try {
				const res = await fetch(
					`${API_BASE}/api/conversations/${sid}/messages`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ content }),
					},
				);
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data = await res.json();
				const botMsg: ChatMessage = data.message;
				const meta = botMsg.metadata;

				setMessages((prev) => {
					const updated = [...prev, botMsg];
					const newProg = meta?.progress ?? progress;
					setProgress(newProg);

					// Merge any lead data
					if (meta?.lead_data) {
						setLeadData((prevLd) => {
							const merged = { ...prevLd, ...meta.lead_data };
							persist(sid, updated, merged, newProg);
							return merged;
						});
					} else {
						persist(sid, updated, leadData, newProg);
					}

					// Check for report
					if (meta?.is_report && meta.report) {
						setReport(meta.report);
						setTimeout(() => setPhase("report"), 1500);
					}

					return updated;
				});
			} catch {
				setError("Something went wrong. Please try again.");
			} finally {
				setIsLoading(false);
			}
		},
		[isLoading, progress, leadData, persist],
	);

	// -----------------------------------------------------------------------
	// Lead capture handler
	// -----------------------------------------------------------------------

	const handleLeadCapture = useCallback(
		(data: Record<string, string>) => {
			setLeadData((prev) => ({ ...prev, ...data }));
			// Send as a formatted text message to the agent
			const text = Object.entries(data)
				.map(([k, v]) => `${k}: ${v}`)
				.join(", ");
			sendMessage(text);
		},
		[sendMessage],
	);

	// -----------------------------------------------------------------------
	// Init
	// -----------------------------------------------------------------------

	// biome-ignore lint/correctness/useExhaustiveDependencies: init effect runs once on mount
	useEffect(() => {
		const stored = loadSession();
		if (stored) {
			setPhase("resume-prompt");
			setSessionId(stored.sessionId);
			setMessages(stored.messages);
			setLeadData(stored.leadData);
			setProgress(stored.progress);
		} else {
			startConversation();
		}
	}, []);

	// -----------------------------------------------------------------------
	// Render
	// -----------------------------------------------------------------------

	if (phase === "loading") {
		return (
			<div className="rounded-xl border border-foreground/10 bg-white min-h-[500px] flex items-center justify-center">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0ms]" />
					<div className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:150ms]" />
					<div className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:300ms]" />
				</div>
			</div>
		);
	}

	if (phase === "resume-prompt") {
		return (
			<div className="rounded-xl border border-foreground/10 bg-white min-h-[400px] md:min-h-[500px]">
				<ProgressBar progress={progress} />
				<ResumePrompt
					onContinue={() => {
						const stored = loadSession();
						if (stored) resumeConversation(stored);
						else startConversation();
					}}
					onStartFresh={() => {
						clearSession();
						setMessages([]);
						setLeadData({});
						setProgress(0);
						startConversation();
					}}
				/>
			</div>
		);
	}

	if (phase === "report" && report) {
		return (
			<div className="rounded-xl border border-foreground/10 bg-white">
				<ProgressBar progress={1} />
				<ReportView report={report} />
			</div>
		);
	}

	return (
		<div className="rounded-xl border border-foreground/10 bg-white min-h-[400px] md:min-h-[500px] flex flex-col">
			<ProgressBar progress={progress} />
			<ChatWindow
				messages={messages}
				isLoading={isLoading}
				onSendMessage={sendMessage}
				onLeadCapture={handleLeadCapture}
			/>
			{error && (
				<div className="px-4 py-2 bg-red-50 border-t border-red-200">
					<p className="font-body text-xs text-red-600 text-center">
						{error}{" "}
						<button
							type="button"
							onClick={() => setError(null)}
							className="underline underline-offset-2 cursor-pointer"
						>
							Dismiss
						</button>
					</p>
				</div>
			)}
			<FreeTextInput
				onSubmit={sendMessage}
				disabled={isLoading}
				placeholder={
					isLoading ? "Waiting for response..." : "Type your message..."
				}
			/>
		</div>
	);
}
