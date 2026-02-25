export default function ProgressBar({ progress }: { progress: number }) {
	const pct = Math.min(Math.max(progress * 100, 0), 100);

	return (
		<div className="w-full h-1 bg-muted rounded-t-xl overflow-hidden">
			<div
				className="h-full bg-accent transition-all duration-500 ease-out"
				style={{ width: `${pct}%` }}
			/>
		</div>
	);
}
