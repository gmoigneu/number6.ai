// @ts-check

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	server: {
		// @ts-expect-error
		port: Number(process.env.PORT) || 4321,
		host: true,
	},

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [react()],
});
