import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

const INTERESTS = [
	"Training & workshops",
	"AI strategy",
	"Custom AI solutions",
	"Ongoing partnership",
	"Not sure yet",
];

const COMPANY_SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"];

const REFERRAL_SOURCES = [
	"Google search",
	"LinkedIn",
	"Referral",
	"Social media",
	"Event / conference",
	"Other",
];

const ACCESS_KEY = "9fdad137-5a11-472b-9fe0-cb423b0a51bd";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [company, setCompany] = useState("");
	const [companySize, setCompanySize] = useState("");
	const [interests, setInterests] = useState<string[]>([]);
	const [message, setMessage] = useState("");
	const [referral, setReferral] = useState("");
	const [formState, setFormState] = useState<FormState>("idle");
	const [errors, setErrors] = useState<Record<string, string>>({});

	function toggleInterest(interest: string) {
		setInterests((prev) =>
			prev.includes(interest)
				? prev.filter((i) => i !== interest)
				: [...prev, interest],
		);
	}

	function validate(): boolean {
		const newErrors: Record<string, string> = {};
		if (!name.trim()) newErrors.name = "Name is required.";
		if (!email.trim()) {
			newErrors.email = "Email is required.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = "Please enter a valid email address.";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function clearError(field: string) {
		setErrors((prev) => {
			if (!prev[field]) return prev;
			const next = { ...prev };
			delete next[field];
			return next;
		});
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!validate()) return;

		setFormState("submitting");
		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					access_key: ACCESS_KEY,
					name: name.trim(),
					email: email.trim(),
					company: company.trim() || undefined,
					company_size: companySize || undefined,
					interests: interests.length > 0 ? interests.join(", ") : undefined,
					message: message.trim() || undefined,
					referral_source: referral || undefined,
				}),
			});
			const data = await response.json();
			if (data.success) {
				setFormState("success");
			} else {
				setFormState("error");
			}
		} catch {
			setFormState("error");
		}
	}

	if (formState === "success") {
		return (
			<div className="flex flex-col items-center gap-6 py-16 w-full max-w-[700px]">
				<CheckCircle className="h-16 w-16 text-accent" />
				<h3 className="font-heading text-3xl font-bold text-primary-foreground text-center tracking-[-1px]">
					Message sent. We're on it.
				</h3>
				<p className="font-body text-base text-secondary-foreground text-center leading-[1.6] max-w-[500px]">
					Thanks for reaching out. We'll get back to you within one business day
					— usually much sooner. Keep an eye on your inbox.
				</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-6 w-full max-w-[700px]"
			noValidate
		>
			{/* Name + Email row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="flex flex-col gap-2">
					<label
						htmlFor="contact-name"
						className="font-heading text-xs font-semibold tracking-[0.5px] text-primary-foreground"
					>
						Your name *
					</label>
					<input
						id="contact-name"
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
							clearError("name");
						}}
						className="h-12 bg-[#2A2A2A] px-4 font-body text-sm text-primary-foreground placeholder-[#666] outline-none focus:ring-1 focus:ring-accent"
						placeholder="Your name"
					/>
					{errors.name && (
						<span className="font-body text-xs text-red-400">
							{errors.name}
						</span>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="contact-email"
						className="font-heading text-xs font-semibold tracking-[0.5px] text-primary-foreground"
					>
						Email address *
					</label>
					<input
						id="contact-email"
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							clearError("email");
						}}
						className="h-12 bg-[#2A2A2A] px-4 font-body text-sm text-primary-foreground placeholder-[#666] outline-none focus:ring-1 focus:ring-accent"
						placeholder="you@company.com"
					/>
					{errors.email && (
						<span className="font-body text-xs text-red-400">
							{errors.email}
						</span>
					)}
				</div>
			</div>

			{/* Company + Company Size row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="flex flex-col gap-2">
					<label
						htmlFor="contact-company"
						className="font-heading text-xs font-semibold tracking-[0.5px] text-primary-foreground"
					>
						Company name
					</label>
					<input
						id="contact-company"
						type="text"
						value={company}
						onChange={(e) => setCompany(e.target.value)}
						className="h-12 bg-[#2A2A2A] px-4 font-body text-sm text-primary-foreground placeholder-[#666] outline-none focus:ring-1 focus:ring-accent"
						placeholder="Company name"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="contact-company-size"
						className="font-heading text-xs font-semibold tracking-[0.5px] text-primary-foreground"
					>
						Company size
					</label>
					<select
						id="contact-company-size"
						value={companySize}
						onChange={(e) => setCompanySize(e.target.value)}
						className="h-12 bg-[#2A2A2A] px-4 font-body text-sm text-primary-foreground outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
					>
						<option value="" disabled>
							Select...
						</option>
						{COMPANY_SIZES.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Interests */}
			<fieldset className="flex flex-col gap-3 border-none p-0 m-0">
				<legend className="font-heading text-xs font-semibold tracking-[0.5px] text-primary-foreground mb-0">
					What are you interested in?
				</legend>
				<div className="flex flex-wrap gap-[10px]">
					{INTERESTS.map((interest) => {
						const selected = interests.includes(interest);
						return (
							<button
								key={interest}
								type="button"
								onClick={() => toggleInterest(interest)}
								className={`px-4 py-2 font-body text-sm transition-colors cursor-pointer ${
									selected
										? "bg-accent border border-accent text-accent-foreground"
										: "bg-transparent border border-[#444] text-secondary-foreground hover:border-[#666]"
								}`}
							>
								{interest}
							</button>
						);
					})}
				</div>
			</fieldset>

			{/* Message */}
			<div className="flex flex-col gap-2">
				<label
					htmlFor="contact-message"
					className="font-heading text-xs font-semibold tracking-[0.5px] text-primary-foreground"
				>
					Tell us more
				</label>
				<textarea
					id="contact-message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="h-[140px] bg-[#2A2A2A] p-4 font-body text-sm text-primary-foreground placeholder-[#666] outline-none focus:ring-1 focus:ring-accent resize-none leading-[1.6]"
					placeholder="What's on your mind? A challenge you're facing, a question about AI, a project idea — anything goes."
				/>
			</div>

			{/* Referral */}
			<div className="flex flex-col gap-2 max-w-[338px]">
				<label
					htmlFor="contact-referral"
					className="font-heading text-xs font-semibold tracking-[0.5px] text-primary-foreground"
				>
					How did you hear about us?
				</label>
				<select
					id="contact-referral"
					value={referral}
					onChange={(e) => setReferral(e.target.value)}
					className="h-12 bg-[#2A2A2A] px-4 font-body text-sm text-primary-foreground outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
				>
					<option value="" disabled>
						Select...
					</option>
					{REFERRAL_SOURCES.map((source) => (
						<option key={source} value={source}>
							{source}
						</option>
					))}
				</select>
			</div>

			{/* Error message */}
			{formState === "error" && (
				<div className="font-body text-sm text-red-400 text-center">
					Something went wrong. Please try again, or email us directly at{" "}
					<a
						href="mailto:hello@number6.ai"
						className="text-accent underline underline-offset-2"
					>
						hello@number6.ai
					</a>
					.
				</div>
			)}

			{/* Submit */}
			<div className="flex justify-center pt-2">
				<button
					type="submit"
					disabled={formState === "submitting"}
					className="flex items-center gap-3 bg-accent px-8 py-4 font-heading text-[13px] font-semibold tracking-[1px] text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
				>
					{formState === "submitting" ? (
						<>
							SENDING...
							<Loader2 className="h-4 w-4 animate-spin" />
						</>
					) : (
						<>
							SEND MESSAGE
							<ArrowRight className="h-4 w-4" />
						</>
					)}
				</button>
			</div>
		</form>
	);
}
