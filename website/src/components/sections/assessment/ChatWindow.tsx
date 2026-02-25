import { useCallback, useEffect, useRef } from "react";
import LeadCaptureStep from "./LeadCaptureStep";
import MessageBubble from "./MessageBubble";
import QuickReplyButtons from "./QuickReplyButtons";
import TypingIndicator from "./TypingIndicator";
import type { ChatMessage } from "./types";

interface Props {
	messages: ChatMessage[];
	isLoading: boolean;
	onSendMessage: (text: string) => void;
	onLeadCapture: (data: Record<string, string>) => void;
}

export default function ChatWindow({
	messages,
	isLoading,
	onSendMessage,
	onLeadCapture,
}: Props) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const userScrolledUp = useRef(false);

	const scrollToBottom = useCallback(() => {
		if (!scrollRef.current || userScrolledUp.current) return;
		scrollRef.current.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: we want to scroll on every messages/isLoading change
	useEffect(() => {
		scrollToBottom();
	}, [messages, isLoading, scrollToBottom]);

	function handleScroll() {
		if (!scrollRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
		const distFromBottom = scrollHeight - scrollTop - clientHeight;
		userScrolledUp.current = distFromBottom > 100;
	}

	return (
		<div
			ref={scrollRef}
			onScroll={handleScroll}
			className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4 min-h-0"
		>
			{messages.map((msg, i) => {
				const isLast = i === messages.length - 1;
				const meta = msg.metadata;
				const showQuickReplies =
					isLast &&
					msg.role === "assistant" &&
					meta &&
					meta.suggested_replies.length > 0 &&
					!isLoading &&
					(meta.input_type === "single-choice" ||
						meta.input_type === "multi-choice");

				const showLeadCapture =
					isLast &&
					msg.role === "assistant" &&
					meta?.input_type === "lead-capture" &&
					meta.lead_fields.length > 0 &&
					!isLoading;

				return (
					<div key={`msg-${msg.created_at || i}`}>
						<MessageBubble message={msg} />
						{showQuickReplies && (
							<QuickReplyButtons
								replies={meta.suggested_replies}
								inputType={meta.input_type}
								onSelect={onSendMessage}
								disabled={isLoading}
							/>
						)}
						{showLeadCapture && (
							<LeadCaptureStep
								fields={meta.lead_fields}
								onSubmit={onLeadCapture}
								disabled={isLoading}
							/>
						)}
					</div>
				);
			})}
			{isLoading && <TypingIndicator />}
		</div>
	);
}
