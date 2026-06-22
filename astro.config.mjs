import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { remarkWrapTables } from "./remarkPlugins";
import { remarkAlert } from "remark-github-blockquote-alert";
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
			remarkPlugins: [remarkAlert, remarkWrapTables],
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
		service: { entrypoint: "./src/image-service.mjs" },
		remotePatterns: [{ protocol: "https" }],
	},
	devToolbar: {
		enabled: false,
	},
});
