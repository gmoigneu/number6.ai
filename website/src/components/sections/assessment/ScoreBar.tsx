interface Props {
	label: string;
	score: number;
	tier: string;
}

export default function ScoreBar({ label, score, tier }: Props) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between items-baseline">
				<span className="font-heading text-sm font-semibold text-foreground">
					{label}
				</span>
				<div className="flex items-baseline gap-2">
					<span className="font-heading text-lg font-bold text-accent">
						{score}
					</span>
					<span className="font-body text-xs text-foreground/50">{tier}</span>
				</div>
			</div>
			<div className="w-full h-2 bg-foreground/8 rounded-full overflow-hidden">
				<div
					className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
					style={{ width: `${score}%` }}
				/>
			</div>
		</div>
	);
}
