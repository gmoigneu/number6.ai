// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://number6.ai",

	server: {
		// @ts-expect-error
		port: Number(process.env.PORT) || 4321,
		host: true,
	},

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		react(),
		sitemap({
			filter: (page) =>
				!["/privacy/", "/terms/", "/cookies/"].some((p) => page.endsWith(p)),
		}),
	],
});
