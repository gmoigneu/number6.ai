import { ArrowRight, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import ScoreBar from "./ScoreBar";
import type { ReportPayload } from "./types";

interface Props {
	report: ReportPayload;
}

export default function ReportView({ report }: Props) {
	const [visible, setVisible] = useState(false);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	function handleCopyLink() {
		const url = new URL(window.location.href);
		url.searchParams.set("score", String(report.overall_score));
		url.searchParams.set("tier", report.overall_tier);
		for (const dim of report.dimensions) {
			url.searchParams.set(
				`d_${dim.dimension.toLowerCase().replace(/\s+/g, "_")}`,
				String(dim.score),
			);
		}
		navigator.clipboard.writeText(url.toString());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div
			className={`flex flex-col gap-8 py-8 px-4 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
		>
			{/* Overall score */}
			<div className="text-center">
				<p className="font-heading text-xs font-semibold tracking-widest text-accent uppercase mb-3">
					Your AI readiness score
				</p>
				<p className="font-heading text-[64px] font-bold text-foreground leading-none">
					{report.overall_score}
				</p>
				<p className="font-heading text-lg text-accent mt-1">
					{report.overall_tier}
				</p>
				<p className="font-body text-sm text-foreground/70 mt-4 max-w-[500px] mx-auto leading-relaxed">
					{report.summary}
				</p>
			</div>

			{/* Dimension scores */}
			<div className="flex flex-col gap-5 bg-muted border border-foreground/8 rounded-lg p-6">
				<h3 className="font-heading text-base font-semibold text-foreground">
					Dimension breakdown
				</h3>
				{report.dimensions.map((dim) => (
					<ScoreBar
						key={dim.dimension}
						label={dim.dimension}
						score={dim.score}
						tier={dim.tier}
					/>
				))}
			</div>

			{/* Dimension analysis */}
			<div className="flex flex-col gap-4">
				{report.dimensions.map((dim) => (
					<div
						key={dim.dimension}
						className="bg-muted border border-foreground/8 rounded-lg p-5"
					>
						<div className="flex justify-between items-baseline mb-2">
							<h4 className="font-heading text-sm font-semibold text-foreground">
								{dim.dimension}
							</h4>
							<span className="font-heading text-sm font-bold text-accent">
								{dim.score}/100
							</span>
						</div>
						<p className="font-body text-sm text-foreground/70 leading-relaxed">
							{dim.analysis}
						</p>
					</div>
				))}
			</div>

			{/* Recommendations */}
			<div>
				<h3 className="font-heading text-base font-semibold text-foreground mb-4">
					Recommendations
				</h3>
				<div className="flex flex-col gap-3">
					{report.recommendations.map((rec) => (
						<div
							key={rec.title}
							className="bg-muted border border-foreground/8 rounded-lg p-5"
						>
							<div className="flex items-start justify-between gap-3 mb-2">
								<h4 className="font-heading text-sm font-semibold text-foreground">
									{rec.title}
								</h4>
								<span className="flex-shrink-0 px-2 py-0.5 font-body text-[10px] font-medium text-accent border border-accent/30 rounded">
									{rec.service_area}
								</span>
							</div>
							<p className="font-body text-sm text-foreground/70 leading-relaxed">
								{rec.description}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Share */}
			<div className="flex justify-center">
				<button
					type="button"
					onClick={handleCopyLink}
					className="flex items-center gap-2 px-4 py-2 bg-transparent border border-foreground/15 text-foreground/70 font-heading text-xs font-semibold tracking-wide rounded-md hover:border-accent transition-colors cursor-pointer"
				>
					{copied ? (
						<>
							<Check className="w-3.5 h-3.5 text-accent" />
							Copied!
						</>
					) : (
						<>
							<Copy className="w-3.5 h-3.5" />
							Copy results link
						</>
					)}
				</button>
			</div>

			{/* CTA */}
			<div className="bg-accent rounded-lg p-8 text-center">
				<h3 className="font-heading text-2xl font-bold text-white mb-2">
					Ready to take the next step?
				</h3>
				<p className="font-body text-sm text-white/80 mb-6 max-w-[400px] mx-auto">
					Our team can help you turn these insights into action. Book a free
					discovery call to discuss your results.
				</p>
				<div className="flex flex-wrap gap-3 justify-center">
					<a
						href="/contact"
						className="flex items-center gap-2 px-6 py-3 bg-foreground text-white font-heading text-xs font-semibold tracking-wide rounded-md hover:bg-foreground/80 transition-colors"
					>
						Book a free discovery call
						<ArrowRight className="w-3.5 h-3.5" />
					</a>
					<a
						href="/services"
						className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/30 text-white font-heading text-xs font-semibold tracking-wide rounded-md hover:border-white/60 transition-colors"
					>
						Explore our services
					</a>
				</div>
			</div>
		</div>
	);
}
