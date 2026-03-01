import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	return posts.map((post) => ({
		params: { slug: post.id },
		props: { post },
	}));
};

export const GET: APIRoute = ({ props }) => {
	const { post } = props;

	const lines: string[] = [`# ${post.data.title}`, ""];

	if (post.data.subtitle) {
		lines.push(`> ${post.data.subtitle}`, "");
	}

	lines.push(
		`**Date:** ${post.data.date.toISOString().split("T")[0]}`,
		`**Category:** ${post.data.category}`,
		`**Tags:** ${post.data.tags.join(", ")}`,
		"",
		post.data.excerpt,
		"",
		"---",
		"",
	);

	const body = post.body ?? "";
	const markdown = lines.join("\n") + body;

	return new Response(markdown, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
};
