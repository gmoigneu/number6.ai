export interface Category {
	slug: string;
	name: string;
	description: string;
}

export const categories: Record<string, Category> = {
	"ai-for-humans": {
		slug: "ai-for-humans",
		name: "AI for Actual Humans",
		description: "Guides & explainers",
	},
	"honest-take": {
		slug: "honest-take",
		name: "The Honest Take",
		description: "Opinions & analysis",
	},
	"90-day-wins": {
		slug: "90-day-wins",
		name: "90-Day Wins",
		description: "Case studies & results",
	},
	"behind-the-agent": {
		slug: "behind-the-agent",
		name: "Behind the Agent",
		description: "Technical deep-dives",
	},
};

export const categorySlugs = Object.keys(categories) as Array<
	keyof typeof categories
>;
