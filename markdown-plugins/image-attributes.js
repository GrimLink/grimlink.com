import { defineMdastPlugin } from "satteri";

// `{ #id .class key=value key="two words" }`, the same shapes Sätteri's heading attributes take.
// Curly quotes are accepted because smart punctuation, which Astro leaves on, gets to this text
// before any plugin does.
const ATTRIBUTES_PATTERN =
	/([#.])([^\s"'\u201C\u201D\u2018\u2019=]+)|([^\s"'\u201C\u201D\u2018\u2019=]+)=(?:["\u201C]([^"\u201D]*)["\u201D]|['\u2018]([^'\u2019]*)['\u2019]|([^\s}]*))/g;

/**
 * Reads the inside of an attribute block into hast properties.
 * @param {string} source Text between the braces.
 * @returns {Record<string, string|string[]>|null} Null when there was nothing to read.
 */
function parseAttributes(source) {
	/** @type {Record<string, string|string[]>} */
	const properties = {};
	const classNames = [];
	let found = false;

	for (const [, marker, markerValue, key, doubleQuoted, singleQuoted, bare] of source.matchAll(
		ATTRIBUTES_PATTERN,
	)) {
		found = true;

		if (marker === "#") properties.id = markerValue;
		else if (marker === ".") classNames.push(markerValue);
		else properties[key] = doubleQuoted ?? singleQuoted ?? bare;
	}

	// `class`, not `className`. Astro keeps `className` on the element and also feeds it through
	// `getImage`, so a local image would come out with the attribute twice.
	if (classNames.length > 0) properties.class = classNames.join(" ");

	return found ? properties : null;
}

/**
 * Merges the defaults with what one image asked for. Classes add up, since a default class is
 * usually a base the image builds on, everything else is a plain override.
 * @param {Record<string, string>} defaults
 * @param {Record<string, string|string[]>} own
 * @returns {Record<string, string|string[]>}
 */
function mergeAttributes(defaults, own) {
	const merged = { ...defaults, ...own };

	if (defaults.class && own.class) merged.class = `${defaults.class} ${own.class}`;

	return merged;
}

/**
 * @typedef {object} ImageAttributesOptions
 * @property {Record<string, string>} [defaults] Attributes for every image. One image overrides
 *   these with its own block, except for `class`, which is added to.
 */

/**
 * Adds `{ #id .class width=400 }` after an image, the same syntax Sätteri's `headingAttributes`
 * feature gives headings.
 * @param {ImageAttributesOptions} [options]
 * @returns {import("satteri").MdastPluginDefinition}
 */
export function imageAttributes({ defaults = {} } = {}) {
	// `class`, never `className`, for the same reason the parsed attributes use it.
	const { className, ...rest } = defaults;
	const shared = className ? { ...rest, class: [rest.class, className].filter(Boolean).join(" ") } : rest;
	const hasDefaults = Object.keys(shared).length > 0;

	return defineMdastPlugin({
		name: "image-attributes",
		image(node, ctx) {
			const parent = ctx.parent(node);
			const index = ctx.indexOf(node);

			// The block has to touch the image, or a `{` anywhere later in the sentence would be
			// read as attributes.
			const next = parent && index !== undefined ? parent.children[index + 1] : undefined;
			const match = next?.type === "text" ? next.value.match(/^\{([^}]*)\}/) : null;
			const own = match ? parseAttributes(match[1]) : null;

			if (!own && !hasDefaults) return;

			ctx.setProperty(node, "data", {
				...node.data,
				hProperties: mergeAttributes(shared, own ?? {}),
			});

			if (!own) return;

			const rest = next.value.slice(match[0].length);
			if (rest) ctx.setProperty(next, "value", rest);
			else ctx.removeNode(next);
		},
	});
}
