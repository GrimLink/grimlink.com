import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://grimlink.com",
	integrations: [sitemap()],
	devToolbar: {
		enabled: false,
	},
});
