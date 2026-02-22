import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		author: z.enum(["partner-houston", "partner-manchester"]),
		category: z.enum([
			"ai-for-humans",
			"honest-take",
			"90-day-wins",
			"behind-the-agent",
		]),
		tags: z.array(z.string()),
		excerpt: z.string(),
		featured_image: z.string(),
		featured_image_alt: z.string(),
		featured: z.boolean().default(false),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
