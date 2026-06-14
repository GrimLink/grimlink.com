import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
	schema: ({ image }) =>
		z.object({
			title: z.string().min(10).max(64),
			description: z.string().max(160),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			image: z.optional(image()),
			thumb: z.optional(image().describe("Overrides the image to set a specific blog thumb")),
			tags: z.array(z.string()).optional(),
			crossPosts: z.record(z.string(), z.string()).optional(),
		}),
});

export const collections = { blog };
