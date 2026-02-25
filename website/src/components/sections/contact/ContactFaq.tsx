import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
	{
		question: "Is the discovery call really free?",
		answer:
			"Yes. 30 minutes, no strings attached. We don't do bait-and-switch. If we can't help you, we'll tell you that too.",
	},
	{
		question:
			"I'm not sure if my business is ready for AI. Should I still reach out?",
		answer:
			"Absolutely. That's exactly what the discovery call is for. Most of our clients come to us at the 'curious but uncertain' stage. We'll help you figure out whether AI makes sense for your business right now, and if not, what to focus on first.",
	},
	{
		question: "Do you work with companies outside the US and UK?",
		answer:
			"Yes. While we're based in Houston and Manchester, most of our work is delivered virtually. We've worked with clients across North America and Europe. Timezone compatibility matters more than geography.",
	},
	{
		question: "How quickly can you start?",
		answer:
			"It depends on the scope, but we can usually kick off within 1–2 weeks of signing. For urgent projects, we've started within days. The discovery call is the fastest way to find out.",
	},
	{
		question: "What if I just have a quick question?",
		answer:
			"Send us an email at hello@number6.ai. We're happy to point you in the right direction, even if it doesn't turn into a project. We'd rather be helpful than salesy.",
	},
];

export default function ContactFaq() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	function toggle(index: number) {
		setOpenIndex((prev) => (prev === index ? null : index));
	}

	return (
		<section className="flex flex-col items-center gap-12 bg-muted px-4 md:px-8 lg:px-16 py-[100px] w-full">
			<h2 className="font-heading text-[40px] font-bold text-foreground text-center leading-[1.1] tracking-[-1.5px] max-w-[800px]">
				Questions people usually ask before getting in touch.
			</h2>

			<div className="flex flex-col w-full max-w-[800px]">
				{FAQ_ITEMS.map((item, index) => (
					<div key={item.question} className="border-t-2 border-foreground">
						<button
							type="button"
							onClick={() => toggle(index)}
							className="flex items-center justify-between w-full py-6 text-left cursor-pointer"
						>
							<span className="font-heading text-lg font-bold text-foreground tracking-[-0.5px] pr-4">
								{item.question}
							</span>
							{openIndex === index ? (
								<Minus className="h-5 w-5 text-foreground shrink-0" />
							) : (
								<Plus className="h-5 w-5 text-foreground shrink-0" />
							)}
						</button>
						{openIndex === index && (
							<p className="font-body text-base text-muted-foreground leading-[1.7] pb-6">
								{item.answer}
							</p>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
