import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { pagesMarkdown } from "@/data/pages-markdown";

export const GET: APIRoute = async () => {
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	const sorted = posts.sort(
		(a, b) => b.data.date.getTime() - a.data.date.getTime(),
	);

	const sections: string[] = [];

	sections.push("# number6.ai: full content\n");

	for (const page of pagesMarkdown) {
		sections.push(page.markdown.trim());
		sections.push("\n---\n");
	}

	for (const post of sorted) {
		const lines: string[] = [`# ${post.data.title}`, ""];

		if (post.data.subtitle) {
			lines.push(`> ${post.data.subtitle}`, "");
		}

		lines.push(
			`**Date:** ${post.data.date.toISOString().split("T")[0]}`,
			`**Tags:** ${post.data.tags.join(", ")}`,
			"",
		);

		const body = post.body ?? "";
		sections.push(lines.join("\n") + body.trim());
		sections.push("\n---\n");
	}

	return new Response(sections.join("\n"), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
