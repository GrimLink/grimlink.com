import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://grimlink.com",
	integrations: [sitemap()],
	image: {
		remotePatterns: [{ protocol: "https" }],
	},
	devToolbar: {
		enabled: false,
	},
});
