import { useState, useMemo } from "react";

type Currency = {
	symbol: string;
	code: string;
	rate: number;
	label: string;
};

const CURRENCIES: Currency[] = [
	{ symbol: "$", code: "USD", rate: 1, label: "USD" },
	{ symbol: "£", code: "GBP", rate: 0.79, label: "GBP" },
	{ symbol: "€", code: "EUR", rate: 0.92, label: "EUR" },
];

function formatCurrency(value: number, currency: Currency): string {
	const converted = value * currency.rate;
	return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
}

function formatHourly(value: number, currency: Currency): string {
	const converted = value * currency.rate;
	return `${currency.symbol}${Math.round(converted)}/hour`;
}

interface CalculatorInput {
	label: string;
	min: number;
	max: number;
	defaultValue: number;
	step?: number;
}

const INPUTS_BASE: CalculatorInput[] = [
	{
		label: "Company size",
		min: 10,
		max: 500,
		defaultValue: 50,
		step: 5,
	},
	{
		label: "Avg. employee cost (incl. benefits)",
		min: 0,
		max: 150,
		defaultValue: 50,
		step: 5,
	},
	{
		label: "Weekly hours per employee on manual tasks",
		min: 0,
		max: 40,
		defaultValue: 10,
		step: 1,
	},
	{
		label: "Expected efficiency gain with AI",
		min: 0,
		max: 60,
		defaultValue: 35,
		step: 5,
	},
	{
		label: "Current error/rework rate",
		min: 0,
		max: 40,
		defaultValue: 15,
		step: 5,
	},
	{
		label: "Monthly AI tool cost",
		min: 0,
		max: 5000,
		defaultValue: 1000,
		step: 100,
	},
];

function Slider({
	value,
	onChange,
	min,
	max,
	step,
}: {
	value: number;
	onChange: (value: number) => void;
	min: number;
	max: number;
	step: number;
}) {
	const percentage = ((value - min) / (max - min)) * 100;

	return (
		<div className="relative h-8 flex items-center">
			<div className="absolute left-0 right-0 h-2 rounded-full bg-[#E8E4DD]" />
			<div 
				className="absolute left-0 h-2 rounded-full bg-[#C45A3B]"
				style={{ width: `${percentage}%` }}
			/>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="relative z-10 w-full h-8 bg-transparent cursor-pointer"
				style={{
					WebkitAppearance: 'none',
					appearance: 'none',
				}}
			/>
			<style>{`
				input[type="range"]::-webkit-slider-thumb {
					-webkit-appearance: none;
					appearance: none;
					width: 24px;
					height: 24px;
					border-radius: 50%;
					background: #F5F2ED;
					border: 2px solid #C45A3B;
					cursor: grab;
					box-shadow: 0 2px 4px rgba(0,0,0,0.1);
				}
				input[type="range"]::-webkit-slider-thumb:active {
					cursor: grabbing;
				}
				input[type="range"]::-moz-range-thumb {
					width: 24px;
					height: 24px;
					border-radius: 50%;
					background: #F5F2ED;
					border: 2px solid #C45A3B;
					cursor: grab;
				}
				input[type="range"]::-moz-range-thumb:active {
					cursor: grabbing;
				}
			`}</style>
		</div>
	);
}

export default function RoiCalculator() {
	const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
	const [values, setValues] = useState<number[]>(INPUTS_BASE.map((i) => i.defaultValue));

	const getFormat = (index: number) => {
		const input = INPUTS_BASE[index];
		if (index === 0) return (v: number) => `${v} employees`;
		if (index === 1) return (v: number) => formatHourly(v, currency);
		if (index === 3 || index === 4) return (v: number) => `${v}%`;
		if (index === 2) return (v: number) => `${v} hrs/week`;
		if (index === 5) return (v: number) => formatCurrency(v, currency);
		return (v: number) => v.toString();
	};

	const handleValueChange = (index: number, newValue: number) => {
		setValues((prev) => {
			const next = [...prev];
			next[index] = newValue;
			return next;
		});
	};

	const calculations = useMemo(() => {
		const [
			employees,
			hourlyRate,
			hoursPerWeek,
			efficiencyGain,
			errorRate,
			monthlyCost,
		] = values;

		const WEEKS_PER_YEAR = 52;
		const HOURS_PER_YEAR = 2080;
		const WORKING_DAYS = 260;

		const timeSavings =
			employees *
			hoursPerWeek *
			(efficiencyGain / 100) *
			WEEKS_PER_YEAR *
			hourlyRate *
			0.6;

		const errorCostPerInstance = hourlyRate * 0.5;
		const errorInstancesPerEmployee = 100;
		const errorReductionAssumed = 0.5;
		const errorReductionValue =
			employees *
			(errorRate / 100) *
			errorReductionAssumed *
			errorInstancesPerEmployee *
			errorCostPerInstance;

		const qualityProductivityGain = 0.1;
		const qualityWeight = 0.25;
		const qualityValue =
			employees * hourlyRate * HOURS_PER_YEAR * qualityProductivityGain * qualityWeight;

		const decisionMakersRatio = 0.3;
		const daysSavedPerMonth = 2;
		const dailyTeamCost = hourlyRate * 8;
		const decisionSpeedValue =
			employees *
			decisionMakersRatio *
			daysSavedPerMonth *
			WORKING_DAYS *
			dailyTeamCost *
			0.01;

		const turnoverReduction = 0.05;
		const replacementCostFactor = 0.5;
		const employeeExperienceValue =
			employees * turnoverReduction * hourlyRate * HOURS_PER_YEAR * replacementCostFactor;

		const totalAnnualValue =
			timeSavings +
			errorReductionValue +
			qualityValue +
			decisionSpeedValue +
			employeeExperienceValue;

		const annualCost = monthlyCost * 12;
		const roi = annualCost > 0 ? ((totalAnnualValue - annualCost) / annualCost) * 100 : 0;
		const paybackPeriod = totalAnnualValue > 0 ? (annualCost / totalAnnualValue) * 365 : 0;

		return {
			timeSavings,
			errorReductionValue,
			qualityValue,
			decisionSpeedValue,
			employeeExperienceValue,
			totalAnnualValue,
			annualCost,
			roi,
			paybackPeriod,
		};
	}, [values]);

	const results = [
		{
			label: "Time Savings",
			value: calculations.timeSavings,
			description: "Hours reclaimed for higher-value work",
		},
		{
			label: "Error Reduction",
			value: calculations.errorReductionValue,
			description: "Cost of mistakes avoided",
		},
		{
			label: "Quality Uplift",
			value: calculations.qualityValue,
			description: "Productivity from better outputs",
		},
		{
			label: "Decision Speed",
			value: calculations.decisionSpeedValue,
			description: "Faster workflow turnaround",
		},
		{
			label: "Employee Experience",
			value: calculations.employeeExperienceValue,
			description: "Retention & engagement value",
		},
	];

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
				<div className="space-y-8">
					<div className="space-y-2">
						<h2 className="font-heading text-2xl font-bold tracking-[-0.5px]">
							Configure your scenario
						</h2>
						<p className="font-body text-muted-foreground">
							Adjust the sliders to match your company&apos;s situation
						</p>
					</div>

					<div className="flex items-center gap-2">
						<span className="font-body text-sm text-muted-foreground">Currency:</span>
						<div className="flex gap-1">
						{CURRENCIES.map((curr) => (
							<button
								key={curr.code}
								onClick={() => setCurrency(curr)}
								className={`px-3 py-1.5 rounded-md font-body text-sm font-medium transition-colors ${
									currency.code === curr.code
										? "bg-[#C45A3B] text-white"
										: "bg-[#E8E4DD] text-foreground hover:bg-[#C45A3B]/20"
								}`}
							>
								{curr.symbol} {curr.label}
							</button>
						))}
					</div>
				</div>

				<div className="space-y-6">
					{INPUTS_BASE.map((input, index) => (
						<div key={input.label} className="space-y-3">
							<div className="flex items-center justify-between">
								<label className="font-heading text-sm font-medium tracking-tight">
									{input.label}
								</label>
								<span className="font-body text-sm font-semibold text-[#C45A3B] tabular-nums">
									{getFormat(index)(values[index])}
								</span>
							</div>
							<Slider
								value={values[index]}
								onChange={(v) => handleValueChange(index, v)}
								min={input.min}
								max={input.max}
								step={input.step || 1}
							/>
							<div className="flex justify-between text-xs text-muted-foreground font-body">
								<span>{getFormat(index)(input.min)}</span>
								<span>{getFormat(index)(input.max)}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-8">
				<div className="space-y-2">
					<h2 className="font-heading text-2xl font-bold tracking-[-0.5px]">
						Your estimated ROI
					</h2>
					<p className="font-body text-muted-foreground">
						Based on industry benchmarks for SMB AI adoption
					</p>
				</div>

				<div className="bg-primary/5 rounded-2xl p-6 lg:p-8 space-y-6">
					<div className="flex items-baseline gap-2">
						<span className="font-heading text-5xl lg:text-6xl font-bold tracking-[-2px] text-[#C45A3B] tabular-nums">
							{formatCurrency(Math.round(calculations.totalAnnualValue / 1000) * 1000, currency).replace(/\d(?=(\d{3})+$)/g, '$&,')}k
						</span>
						<span className="font-body text-lg text-muted-foreground">/year</span>
					</div>
					<div className="flex flex-wrap gap-4 text-sm">
						<div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-full">
							<svg className="h-4 w-4 text-[#C45A3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7h6v6m-8-6h6v6m-8-4h6v6m-8-2h6v6" />
							</svg>
							<span className="font-body">
								<strong className="font-semibold">{Math.round(calculations.roi).toLocaleString()}%</strong> ROI
							</span>
						</div>
						<div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-full">
							<svg className="h-4 w-4 text-[#C45A3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span className="font-body">
								<strong className="font-semibold">{Math.round(calculations.paybackPeriod)} days</strong> payback
							</span>
						</div>
					</div>
					<div className="pt-2 border-t border-border/60">
						<div className="flex justify-between font-body text-sm">
							<span className="text-muted-foreground">Annual investment</span>
							<span className="font-semibold tabular-nums">
								{formatCurrency(calculations.annualCost, currency)}
							</span>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<h3 className="font-heading text-lg font-semibold tracking-tight">
						Value breakdown
					</h3>
					<div className="space-y-3">
						{results.map((result) => {
							const percentage = calculations.totalAnnualValue > 0
								? (result.value / calculations.totalAnnualValue) * 100
								: 0;
							return (
								<div
									key={result.label}
									className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
								>
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#C45A3B]/10 flex items-center justify-center">
										{result.label === "Time Savings" && (
											<svg className="h-5 w-5 text-[#C45A3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										)}
										{result.label === "Error Reduction" && (
											<svg className="h-5 w-5 text-[#C45A3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
											</svg>
										)}
										{result.label === "Quality Uplift" && (
											<svg className="h-5 w-5 text-[#C45A3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										)}
										{result.label === "Decision Speed" && (
											<svg className="h-5 w-5 text-[#C45A3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
											</svg>
										)}
										{result.label === "Employee Experience" && (
											<svg className="h-5 w-5 text-[#C45A3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
											</svg>
										)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between mb-1">
											<span className="font-body text-sm font-medium">
												{result.label}
											</span>
											<span className="font-body text-sm font-semibold tabular-nums">
												{formatCurrency(Math.round(result.value), currency)}
											</span>
										</div>
										<div className="h-1.5 bg-[#E8E4DD] rounded-full overflow-hidden">
											<div
												className="h-1.5 bg-[#C45A3B] rounded-full transition-all duration-300"
												style={{ width: percentage + "%" }}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="pt-4">
					<a
						href="/contact"
						className="inline-flex items-center gap-3 bg-[#C45A3B] px-6 py-4 font-heading text-sm font-semibold tracking-[1px] text-white hover:bg-[#C45A3B]/90 transition-colors rounded-lg"
					>
						GET A CUSTOM ANALYSIS
						<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
					<p className="mt-3 font-body text-xs text-muted-foreground">
						Based on your inputs, we&apos;d be happy to refine these estimates with
						more details about your specific workflows.
					</p>
				</div>
			</div>
		</div>
		</>
	);
}
