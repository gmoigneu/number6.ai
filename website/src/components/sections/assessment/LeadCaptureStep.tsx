import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { LeadField } from "./types";

interface Props {
	fields: LeadField[];
	onSubmit: (data: Record<string, string>) => void;
	disabled?: boolean;
}

export default function LeadCaptureStep({
	fields,
	onSubmit,
	disabled = false,
}: Props) {
	const [values, setValues] = useState<Record<string, string>>({});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitted, setSubmitted] = useState(false);

	if (submitted) return null;

	function validate(): boolean {
		const newErrors: Record<string, string> = {};
		for (const field of fields) {
			const val = (values[field.name] || "").trim();
			if (field.required && !val) {
				newErrors[field.name] = `${field.name} is required`;
			}
			if (
				field.type === "email" &&
				val &&
				!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
			) {
				newErrors[field.name] = "Please enter a valid email address";
			}
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit() {
		if (disabled || !validate()) return;
		setSubmitted(true);
		const data: Record<string, string> = {};
		for (const field of fields) {
			const val = (values[field.name] || "").trim();
			if (val) data[field.name] = val;
		}
		onSubmit(data);
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
		}
	}

	return (
		<div className="ml-11 mt-2 flex flex-col gap-3 max-w-[400px]">
			{fields.map((field) => (
				<div key={field.name} className="flex flex-col gap-1">
					<label
						htmlFor={`lead-${field.name}`}
						className="font-heading text-xs font-semibold tracking-wide text-foreground capitalize"
					>
						{field.name}
						{field.required && <span className="text-accent ml-0.5">*</span>}
					</label>
					<input
						id={`lead-${field.name}`}
						type={field.type === "email" ? "email" : "text"}
						value={values[field.name] || ""}
						onChange={(e) => {
							setValues((prev) => ({ ...prev, [field.name]: e.target.value }));
							setErrors((prev) => {
								if (!prev[field.name]) return prev;
								const next = { ...prev };
								delete next[field.name];
								return next;
							});
						}}
						onKeyDown={handleKeyDown}
						disabled={disabled}
						placeholder={field.placeholder || field.name}
						className="bg-muted px-3 py-2 font-body text-sm text-foreground placeholder-foreground/40 rounded-md outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
					/>
					{errors[field.name] && (
						<span className="font-body text-xs text-red-500">
							{errors[field.name]}
						</span>
					)}
				</div>
			))}
			<button
				type="button"
				onClick={handleSubmit}
				disabled={disabled}
				className="self-start flex items-center gap-2 px-4 py-2 bg-accent text-white font-heading text-xs font-semibold tracking-wide rounded-md hover:bg-accent/90 transition-colors disabled:opacity-40 cursor-pointer"
			>
				Continue
				<ArrowRight className="w-3.5 h-3.5" />
			</button>
		</div>
	);
}
