import { type CollectionEntry, getCollection } from "astro:content";

type MageDoc = CollectionEntry<"mageDocs">;

const topicOrder = ["config", "environments", "automation", "composer-fragments", "templates", "development"];

/**
 * Get the url of a doc on this site.
 * @param {MageDoc} doc
 * @returns {string}
 */
export const docHref = (doc: MageDoc): string => `/mage/docs/${doc.id}/`;

/**
 * Get the short label of a doc, without the repeated `mage` of the command titles.
 * @param {MageDoc} doc
 * @returns {string}
 */
export const docLabel = (doc: MageDoc): string => doc.data.title.replace(/\bmage /g, "");

/**
 * Nest the docs of subcommands, such as `add-theme`, under the doc of their command.
 * @param {MageDoc[]} docs Sorted docs of one group
 * @returns {{ doc: MageDoc; children: MageDoc[] }[]}
 */
export function nestSubcommands(docs: MageDoc[]): { doc: MageDoc; children: MageDoc[] }[] {
	const items: { doc: MageDoc; children: MageDoc[] }[] = [];
	for (const doc of docs) {
		const parent = items.find((item) => doc.id.startsWith(`${item.doc.id}-`));
		if (parent) parent.children.push(doc);
		else items.push({ doc, children: [] });
	}
	return items;
}

/**
 * Get the docs grouped and ordered for the sidebar, topics in reading order, commands by their label.
 * @returns {Promise<{ title: string; docs: MageDoc[] }[]>}
 */
export async function getMageDocsNav(): Promise<{ title: string; docs: MageDoc[] }[]> {
	const docs = await getCollection("mageDocs");
	const rank = (doc: MageDoc) => {
		const index = topicOrder.indexOf(doc.id);
		return index === -1 ? topicOrder.length : index;
	};

	return [
		{
			title: "Topics",
			docs: docs
				.filter((doc) => doc.data.group === "topics")
				.sort((a, b) => rank(a) - rank(b) || a.id.localeCompare(b.id)),
		},
		{
			title: "Commands",
			docs: docs
				.filter((doc) => doc.data.group === "commands")
				.sort((a, b) => docLabel(a).localeCompare(docLabel(b))),
		},
	];
}
