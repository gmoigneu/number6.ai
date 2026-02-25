import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

const ACCESS_KEY = "7487fc92-2872-4ed4-b346-56c5e11c365f";

type FormState = "idle" | "submitting" | "success" | "error";

export default function NewsletterForm() {
	const [email, setEmail] = useState("");
	const [formState, setFormState] = useState<FormState>("idle");
	const [errorMsg, setErrorMsg] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const trimmed = email.trim();

		if (!trimmed) {
			setErrorMsg("Email is required.");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
			setErrorMsg("Please enter a valid email address.");
			return;
		}

		setErrorMsg("");
		setFormState("submitting");

		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					access_key: ACCESS_KEY,
					email: trimmed,
					subject: "New newsletter subscriber",
				}),
			});
			const data = await response.json();
			if (data.success) {
				setFormState("success");
			} else {
				setFormState("error");
			}
		} catch {
			setFormState("error");
		}
	}

	if (formState === "success") {
		return (
			<div className="flex items-center gap-3">
				<CheckCircle className="h-5 w-5 text-accent shrink-0" />
				<p className="font-body text-sm text-accent-foreground">
					You're in. Watch your inbox for the next issue.
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 w-full">
			<form onSubmit={handleSubmit} className="flex gap-3 w-full" noValidate>
				<div
					className={`flex items-center flex-1 rounded-[4px] border px-4 py-3.5 ${
						errorMsg ? "border-red-400" : "border-border"
					}`}
				>
					<input
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							if (errorMsg) setErrorMsg("");
						}}
						placeholder="Your email address"
						className="bg-transparent font-body text-sm text-accent-foreground placeholder:text-muted-foreground outline-none w-full"
					/>
				</div>
				<button
					type="submit"
					disabled={formState === "submitting"}
					className="flex items-center justify-center rounded-[4px] bg-accent px-7 py-3.5 font-heading text-[13px] font-semibold tracking-[1px] text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
				>
					{formState === "submitting" ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						"SUBSCRIBE"
					)}
				</button>
			</form>
			{errorMsg && <p className="font-body text-xs text-red-400">{errorMsg}</p>}
			{formState === "error" && (
				<p className="font-body text-xs text-red-400">
					Something went wrong. Please try again.
				</p>
			)}
		</div>
	);
}
