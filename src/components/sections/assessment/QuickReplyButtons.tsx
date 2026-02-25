import { useState } from "react";
import type { InputType } from "./types";

interface Props {
	replies: string[];
	inputType: InputType;
	onSelect: (value: string) => void;
	disabled?: boolean;
}

export default function QuickReplyButtons({
	replies,
	inputType,
	onSelect,
	disabled = false,
}: Props) {
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [submitted, setSubmitted] = useState(false);

	if (replies.length === 0 || submitted) return null;

	function handleSingleChoice(reply: string) {
		if (disabled) return;
		setSelected(new Set([reply]));
		setSubmitted(true);
		onSelect(reply);
	}

	function handleMultiToggle(reply: string) {
		if (disabled) return;
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(reply)) {
				next.delete(reply);
			} else {
				next.add(reply);
			}
			return next;
		});
	}

	function handleMultiSubmit() {
		if (selected.size === 0 || disabled) return;
		setSubmitted(true);
		onSelect(Array.from(selected).join(", "));
	}

	return (
		<div className="flex flex-wrap gap-2 mt-2 ml-11">
			{replies.map((reply) => {
				const isSelected = selected.has(reply);
				const isFadedOut =
					submitted && inputType === "single-choice" && !isSelected;

				return (
					<button
						key={reply}
						type="button"
						disabled={disabled || submitted}
						onClick={() =>
							inputType === "multi-choice"
								? handleMultiToggle(reply)
								: handleSingleChoice(reply)
						}
						className={`
							px-3 py-1.5 font-body text-sm rounded-md border transition-all cursor-pointer
							disabled:cursor-default
							${
								isSelected
									? "bg-accent border-accent text-white"
									: "bg-transparent border-foreground/15 text-accent hover:border-accent"
							}
							${isFadedOut ? "opacity-30" : ""}
						`}
					>
						{reply}
					</button>
				);
			})}
			{inputType === "multi-choice" && selected.size > 0 && !submitted && (
				<button
					type="button"
					disabled={disabled}
					onClick={handleMultiSubmit}
					className="px-3 py-1.5 font-body text-sm rounded-md bg-accent text-white cursor-pointer hover:bg-accent/90 transition-colors"
				>
					Continue
				</button>
			)}
		</div>
	);
}
