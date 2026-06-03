import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://grimlink.com",
	integrations: [sitemap()],
	redirects: {
		"/feed.xml": "/rss.xml",
		"/*": "/",
	},
	image: {
		remotePatterns: [{ protocol: "https" }],
	},
	devToolbar: {
		enabled: false,
	},
});
