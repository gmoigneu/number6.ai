import type { APIRoute, GetStaticPaths } from "astro";
import { pagesMarkdown } from "@/data/pages-markdown";

export const getStaticPaths: GetStaticPaths = () => {
	return pagesMarkdown.map((page) => ({
		params: { page: page.slug || "index" },
		props: { page },
	}));
};

export const GET: APIRoute = ({ props }) => {
	const { page } = props;
	return new Response(page.markdown, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
};
