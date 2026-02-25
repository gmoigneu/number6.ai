import type { ChatMessage } from "./types";

function BotAvatar() {
	return (
		<div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
			<span className="font-heading text-sm font-bold text-white leading-none">
				6
			</span>
		</div>
	);
}

function formatContent(text: string) {
	const parts = text.split(/(\*\*[^*]+\*\*)/g);
	return parts.map((part) => {
		if (part.startsWith("**") && part.endsWith("**")) {
			return (
				<strong key={part} className="font-semibold text-foreground">
					{part.slice(2, -2)}
				</strong>
			);
		}
		return part;
	});
}

export default function MessageBubble({ message }: { message: ChatMessage }) {
	if (message.role === "assistant") {
		return (
			<div className="flex gap-3 items-start max-w-[90%]">
				<BotAvatar />
				<div className="bg-muted border border-foreground/8 rounded-lg rounded-tl-none px-4 py-3">
					<p className="font-body text-[15px] text-foreground/80 leading-relaxed whitespace-pre-line">
						{formatContent(message.content)}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex justify-end">
			<div className="bg-accent rounded-lg rounded-tr-none px-4 py-3 max-w-[80%]">
				<p className="font-body text-[15px] text-white leading-relaxed whitespace-pre-line">
					{message.content}
				</p>
			</div>
		</div>
	);
}
