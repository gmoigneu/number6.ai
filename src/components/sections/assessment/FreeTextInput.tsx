import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
	onSubmit: (text: string) => void;
	disabled?: boolean;
	placeholder?: string;
}

export default function FreeTextInput({
	onSubmit,
	disabled = false,
	placeholder = "Type your message...",
}: Props) {
	const [text, setText] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	function handleSubmit() {
		const trimmed = text.trim();
		if (!trimmed || disabled) return;
		onSubmit(trimmed);
		setText("");
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleFocus() {
		// On mobile, scroll input into view when keyboard appears
		setTimeout(() => {
			inputRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
		}, 300);
	}

	return (
		<div className="flex gap-2 items-center p-3 border-t border-foreground/10 bg-white rounded-b-xl">
			<input
				ref={inputRef}
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				disabled={disabled}
				placeholder={placeholder}
				className="flex-1 bg-muted px-4 py-2.5 font-body text-sm text-foreground placeholder-foreground/40 rounded-md outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
			/>
			<button
				type="button"
				onClick={handleSubmit}
				disabled={disabled || !text.trim()}
				className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
			>
				<ArrowRight className="w-4 h-4" />
			</button>
		</div>
	);
}
