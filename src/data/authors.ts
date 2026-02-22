export interface Author {
	name: string;
	role: string;
	location: string;
	bio: string;
	linkedin: string;
	avatar: string;
}

export const authors: Record<string, Author> = {
	"partner-houston": {
		name: "Nils Löhndorf",
		role: "Partner",
		location: "Houston, TX",
		bio: "Nils helps businesses cut through the AI hype and build solutions that actually work. Before number6, he spent 15 years in enterprise technology and operations research.",
		linkedin: "https://www.linkedin.com/in/nilsloehndorf/",
		avatar: "/images/authors/nils.jpg",
	},
	"partner-manchester": {
		name: "Adam Sherwood",
		role: "Partner",
		location: "Manchester, UK",
		bio: "Adam brings a decade of experience in digital transformation and AI strategy to number6. He specialises in helping teams adopt AI tools that fit their workflow.",
		linkedin: "https://www.linkedin.com/in/adamsherwood/",
		avatar: "/images/authors/adam.jpg",
	},
};
