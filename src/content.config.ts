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
			thumb: z.optional(
				z
					.union([image(), z.literal(false)])
					.describe("Overrides the image to set a specific blog thumb, or false to hide it"),
			),
			gallery: z
				.array(z.union([image(), z.object({ src: image(), alt: z.string() })]))
				.optional()
				.describe("Images shown in a grid below the post, as a path or with alt text"),
			tags: z.array(z.string()).optional(),
			crossPosts: z.record(z.string(), z.string()).optional(),
		}),
});

export const collections = { blog };
