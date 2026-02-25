export default function TypingIndicator() {
	return (
		<div className="flex gap-3 items-start max-w-[90%]">
			<div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
				<span className="font-heading text-sm font-bold text-white leading-none">
					6
				</span>
			</div>
			<div className="bg-muted border border-foreground/8 rounded-lg rounded-tl-none px-4 py-3 flex items-center gap-2">
				<div className="flex gap-1">
					<span className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0ms]" />
					<span className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:150ms]" />
					<span className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:300ms]" />
				</div>
				<span className="font-body text-xs text-foreground/50 ml-1">
					Agent is thinking...
				</span>
			</div>
		</div>
	);
}
