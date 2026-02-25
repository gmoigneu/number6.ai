export interface Author {
	name: string;
	role: string;
	location: string;
	bio: string;
	linkedin: string;
	avatar: string;
}

export const authors: Record<string, Author> = {
	g: {
		name: "Guillaume M.",
		role: "Partner",
		location: "Houston, TX",
		bio: "G. helps businesses cut through the AI hype and build solutions that actually work. Before number6, he spent 20 years developing ecommerce and automation systems.",
		linkedin: "https://www.linkedin.com/in/guillaumemoigneu",
		avatar: "/images/authors/nils.jpg",
	},
	gq: {
		name: "Greg Q.",
		role: "Partner",
		location: "Manchester, UK",
		bio: "GQ. brings a decade of experience in digital transformation and AI strategy to number6. He specialises in helping teams adopt AI tools that fit their workflow.",
		linkedin: "https://www.linkedin.com/in/gregqualls/",
		avatar: "/images/authors/adam.jpg",
	},
};
