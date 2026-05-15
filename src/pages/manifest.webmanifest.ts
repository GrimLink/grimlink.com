import type { APIRoute } from "astro";
import { siteTitle, siteDescription, themeColor, today } from "@/consts";

const dateHash = `?v=${today.getMonth() + 1}-${today.getFullYear()}`;

const webmanifest = {
	id: "/",
	name: siteTitle,
	short_name: siteTitle,
	description: siteDescription,
	start_url: "/",
	display: "fullscreen",
	orientation: "any",
	theme_color: themeColor,
	background_color: themeColor,
	icons: [
		{
			src: `/icon.svg${dateHash}`,
			type: "image/svg+xml",
			sizes: "any",
			purpose: "any maskable",
		},
		{
			src: `/icon-mono.svg${dateHash}`,
			type: "image/svg+xml",
			sizes: "any",
			purpose: "monochrome",
		},
	],
};

export const GET: APIRoute = () => new Response(JSON.stringify(webmanifest, null, 2));
