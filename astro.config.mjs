import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
	site: "https://grimlink.com",
	integrations: [sitemap()],
	redirects: {
		"/feed.xml": "/rss.xml",
		"/*": "/",
	},
	markdown: {
		processor: unified({
			rehypePlugins: [
				[
					rehypeExternalLinks,
					{
						target: "_blank",
						rel: "noopener noreferrer",
					},
				],
			],
		}),
	},
	image: {
		remotePatterns: [{ protocol: "https" }],
	},
	devToolbar: {
		enabled: false,
	},
});
