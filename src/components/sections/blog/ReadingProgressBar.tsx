import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		function handleScroll() {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			if (docHeight > 0) {
				setProgress(Math.min(100, (scrollTop / docHeight) * 100));
			}
		}
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="w-full h-[3px] bg-muted sticky top-0 z-50">
			<div
				className="h-full bg-accent transition-[width] duration-100 ease-out"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
