import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { wrapTables, githubAlerts, externalLinks } from "./markdown-plugins";

export default defineConfig({
	site: "https://grimlink.com",
	integrations: [sitemap()],
	redirects: {
		"/feed.xml": "/rss.xml",
		"/*": "/",
	},
	markdown: {
		processor: satteri({
			mdastPlugins: [githubAlerts, wrapTables],
			hastPlugins: [externalLinks],
		}),
	},
	image: {
		service: { entrypoint: "./src/image-service.mjs" },
		remotePatterns: [{ protocol: "https" }],
	},
	devToolbar: {
		enabled: false,
	},
});
