import { ArrowRight, RefreshCw } from "lucide-react";

interface Props {
	onContinue: () => void;
	onStartFresh: () => void;
}

export default function ResumePrompt({ onContinue, onStartFresh }: Props) {
	return (
		<div className="flex flex-col items-center gap-6 py-12 px-4 text-center">
			<div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
				<span className="font-heading text-xl font-bold text-white leading-none">
					6
				</span>
			</div>
			<div>
				<h3 className="font-heading text-xl font-bold text-foreground mb-2">
					Welcome back!
				</h3>
				<p className="font-body text-sm text-foreground/70">
					You have an assessment in progress.
				</p>
			</div>
			<div className="flex gap-3">
				<button
					type="button"
					onClick={onContinue}
					className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-heading text-xs font-semibold tracking-wide rounded-md hover:bg-accent/90 transition-colors cursor-pointer"
				>
					Continue where I left off
					<ArrowRight className="w-3.5 h-3.5" />
				</button>
				<button
					type="button"
					onClick={onStartFresh}
					className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-foreground/15 text-foreground/70 font-heading text-xs font-semibold tracking-wide rounded-md hover:border-accent transition-colors cursor-pointer"
				>
					Start fresh
					<RefreshCw className="w-3.5 h-3.5" />
				</button>
			</div>
		</div>
	);
}
