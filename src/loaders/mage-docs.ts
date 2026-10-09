import type { Loader } from "astro/loaders";

export const mageRepo = "https://github.com/GrimLink/mage";
export const mageRef = "main";

const api = "https://api.github.com/repos/GrimLink/mage";
const raw = `https://raw.githubusercontent.com/GrimLink/mage/${mageRef}`;

/**
 * Fetch a url, and fail the build with a clear message when it does not respond.
 * @param {string} url
 * @param {RequestInit} [init]
 * @returns {Promise<Response>}
 */
async function get(url: string, init?: RequestInit): Promise<Response> {
	const response = await fetch(url, init);
	if (!response.ok) throw new Error(`mage docs: ${url} returned ${response.status}`);
	return response;
}

/**
 * List the markdown files in the docs folder of the mage repository.
 * @returns {Promise<string[]>} Repository paths, such as `docs/commands/add.md`
 */
async function listDocs(): Promise<string[]> {
	const token = process.env.GITHUB_TOKEN;
	const response = await get(`${api}/git/trees/${mageRef}?recursive=1`, {
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});
	const { tree } = (await response.json()) as { tree: { path: string; type: string }[] };

	return tree
		.filter(({ path, type }) => type === "blob" && path.startsWith("docs/") && path.endsWith(".md"))
		.map(({ path }) => path);
}

/**
 * Turn a repository path into its route on this site, or its url on GitHub when it is not a doc.
 * @param {string} path Repository path, such as `docs/config.md`
 * @returns {string}
 */
function docUrl(path: string): string {
	if (path.startsWith("docs/") && path.endsWith(".md")) {
		return `/mage/${path.slice(0, -3)}/`;
	}
	return `${mageRepo}/blob/${mageRef}/${path}`;
}

/**
 * Resolve a relative link of a doc against the folder of that doc.
 * @param {string} href
 * @param {string} from Repository path of the doc with the link
 * @returns {string}
 */
function resolveLink(href: string, from: string): string {
	if (/^([a-z][a-z\d+.-]*:|\/|#)/i.test(href)) return href;

	const [target, hash = ""] = href.split(/(?=#)/);
	const segments = from.split("/").slice(0, -1);
	for (const part of target.split("/")) {
		if (part === "..") segments.pop();
		else if (part !== ".") segments.push(part);
	}

	return docUrl(segments.join("/")) + hash;
}

/**
 * Rewrite the inline and reference links of a doc to the routes of this site.
 * @param {string} markdown
 * @param {string} path Repository path of the doc
 * @returns {string}
 */
function rewriteLinks(markdown: string, path: string): string {
	return markdown
		.replace(/(\]\()([^)\s]+)/g, (_, open, href) => open + resolveLink(href, path))
		.replace(/^(\[[^\]]+\]:\s*)(\S+)/gm, (_, label, href) => label + resolveLink(href, path));
}

/**
 * Take the first sentence after the title as plain text, for the description.
 * @param {string} body Markdown without the title
 * @returns {string}
 */
function firstSentence(body: string): string {
	const lines: string[] = [];
	for (const line of body.trimStart().split("\n")) {
		if (!line.trim() || /^(```|\||#|-)/.test(line)) break;
		lines.push(line.trim());
	}

	const text = lines
		.join(" ")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/[`*]/g, "");

	return text.split(/(?<=[.:])\s/)[0].replace(/:$/, ".");
}

/**
 * Load the docs of mage from its repository, so the repository stays the only source.
 * @returns {Loader}
 */
export function mageDocsLoader(): Loader {
	return {
		name: "mage-docs",
		async load({ store, parseData, renderMarkdown, generateDigest, logger }) {
			const paths = await listDocs();
			const docs = await Promise.all(
				paths.map(async (path) => ({ path, markdown: await (await get(`${raw}/${path}`)).text() })),
			);

			store.clear();
			for (const { path, markdown } of docs) {
				const id = path.slice("docs/".length, -".md".length);
				const [, title = id, rest = markdown] = markdown.match(/^#\s+(.+)\n([\s\S]*)$/) ?? [];
				const body = rewriteLinks(rest, path);
				const data = await parseData({
					id,
					data: {
						title,
						description: firstSentence(rest),
						group: id.startsWith("commands/") ? "commands" : "topics",
						path,
					},
				});

				store.set({
					id,
					data,
					body,
					rendered: await renderMarkdown(body),
					digest: generateDigest(markdown),
				});
			}

			logger.info(`Loaded ${docs.length} docs from ${mageRepo} (${mageRef})`);
		},
	};
}
