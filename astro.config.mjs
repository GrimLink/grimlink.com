import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { wrapTables, githubAlerts, externalLinks } from "./markdown-plugins";
import { animationTimelineFix } from "./lightningcss-fixes";

export default defineConfig({
	site: "https://grimlink.com",
	integrations: [sitemap()],
	redirects: {
		"/feed.xml": "/rss.xml",
		"/*": "/",
	},
	markdown: {
		shikiConfig: {
			defaultColor: false,
			themes: {
				light: "github-light-default",
				dark: "github-dark-default",
			},
		},
		processor: satteri({
			mdastPlugins: [githubAlerts, wrapTables],
			hastPlugins: [externalLinks],
		}),
	},
	image: {
		service: { entrypoint: "./src/image-service.mjs" },
		remotePatterns: [{ protocol: "https" }],
	},
	vite: {
		css: {
			lightningcss: { visitor: animationTimelineFix },
		}
	},
	devToolbar: {
		enabled: false,
	},
});
