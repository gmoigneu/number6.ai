import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { authors } from "@/data/authors";

export async function GET(context: APIContext) {
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	const sorted = posts.sort(
		(a, b) => b.data.date.getTime() - a.data.date.getTime(),
	);

	return rss({
		title: "The Honest Take | number6.ai",
		description:
			"Practical, honest writing about AI for businesses. Guides, opinions, case studies, and technical deep-dives from number6.ai.",
		site: context.site ?? "https://number6.ai",
		items: sorted.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.excerpt,
			link: `/blog/${post.id}/`,
			author: authors[post.data.author]?.name ?? post.data.author,
		})),
	});
}
