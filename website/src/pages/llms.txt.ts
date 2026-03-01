import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { categories } from "@/data/categories";
import { pagesMarkdown } from "@/data/pages-markdown";

export const GET: APIRoute = async ({ site }) => {
	const baseUrl = (site?.href ?? "https://number6.ai").replace(/\/$/, "");
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	const sorted = posts.sort(
		(a, b) => b.data.date.getTime() - a.data.date.getTime(),
	);

	const lines: string[] = [];

	lines.push("# number6.ai");
	lines.push("");
	lines.push(
		"> AI consulting agency helping businesses understand, adopt, and build with AI. Senior two-person team based in Houston, TX and Manchester, UK. Training, strategy, custom solutions, and ongoing AI partnerships with published pricing.",
	);
	lines.push("");
	lines.push(
		"- Two-person senior team: clients work directly with the founders",
	);
	lines.push("- Offices: Houston, TX (Americas) and Manchester, UK (Europe)");
	lines.push(
		"- Typical timeline: 30 to 90 days from discovery to working solution",
	);
	lines.push("- Email: hello@number6.ai");
	lines.push("");

	lines.push("## Pages");
	lines.push("");
	for (const page of pagesMarkdown) {
		const pagePath = page.slug === "" ? "index" : page.slug;
		lines.push(
			`- [${page.title}](${baseUrl}/${pagePath}.md): ${page.description}`,
		);
	}
	lines.push("");

	lines.push("## Blog");
	lines.push("");
	for (const [catSlug, catData] of Object.entries(categories)) {
		const catPosts = sorted.filter((p) => p.data.category === catSlug);
		if (catPosts.length === 0) continue;
		lines.push(`### ${catData.name}`);
		lines.push("");
		for (const post of catPosts) {
			lines.push(
				`- [${post.data.title}](${baseUrl}/blog/${post.id}.md): ${post.data.excerpt}`,
			);
		}
		lines.push("");
	}

	lines.push("## Optional");
	lines.push("");
	lines.push(
		`- [Full content](${baseUrl}/llms-full.txt): Complete content of all pages and blog posts in a single file`,
	);
	lines.push("");

	return new Response(lines.join("\n"), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
