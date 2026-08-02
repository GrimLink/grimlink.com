---
title: "Replacing DocSearch with a Custom Search"
description: "How I replaced DocSearch on the Fylgja CSS site with a custom one built on Astro collections, and what that saved."
pubDate: "2026-08-01"
tags: ["astrojs", "fylgjacss", "performance"]
crossPosts:
  - bluesky: "3mrzelkp47c2a"
  - mastodon: "117021622443677592"
  - linkedin: "seanvanzuidam_replacing-docsearch-with-a-custom-search-activity-7489384777717010432-cjRb"
---

Collections are one of [Astro.js]'s biggest strengths. They are a bit stricter than plain files thanks to the types, but that is exactly why they are easy to reuse somewhere else.
I really like that workflow, since it keeps you structured, and it makes it easy to keep AI in check when you pair program with one.

Now for [Fylgja CSS] I have been using [DocSearch] from [Algolia] to provide the search.
That worked great for years, even before Astro, back when the site was still using [11ty].

But the one thing that kept nagging me was the amount of JavaScript it shipped.

For context, I have been a big supporter of the "only send what the user needs" movement since the 11ty days.
That worked out well for Fylgja, the site even made the top 20 of the 11ty leaderboard for performance.
Sure, I could never be number one while shipping any JS at all, but that is a story for another time 😉

Over the years I got fed up with libraries like Google Analytics shipping so much JS for such a simple feature.
So I dropped it. The traffic for Fylgja is sadly not that big, and I would rather spend my time making the code and the site awesome than staring at analytics.
That was the first major JS library to go, still in the 11ty era.

Next on the list was DocSearch.

If you use DocSearch without React, it still bundles [Preact] under the hood, so you ship a full component runtime for what is, on my site, a dialog with a list in it.
It gets worse in v4, which adds AI to the search. I don't mind the features existing, but I do mind paying for the ones I don't use, which is the same idea behind Fylgja CSS itself.
Algolia should make DocSearch modular, so you can pick what you want instead of taking all 131.3 KB of raw JS (37.8 KB gzipped) to the face.

> These numbers are from the Fylgja site running v3. They are different if you use React or the newer v4.

## The stats

These come from two production builds of the same site, one at the commit before the switch and one after.
The only difference between them is the search, so these stats are all down to that.

| Sourced | DocSearch | Custom | Saved            |
| ------- | --------- | ------ | ---------------- |
| Raw     | 131.3 KB  | 6.9 KB | 124.4 KB (94.7%) |
| Gzip    | 37.8 KB   | 2.7 KB | 35.1 KB (92.9%)  |

That is every byte of JavaScript the site ships, not just the search, because DocSearch was very nearly all of it. The custom element is the only script left.

Worth knowing how that old chunk loaded, too. It was a dynamic import, but it fired from a `DOMContentLoaded` listener, so it was fetched, parsed and executed on every single page view, whether or not anyone ever opened the search.

The CSS got a cleanup out of it as well. The custom search is plain HTML, a dialog, an input and a list, which Fylgja already styles classless, so all it needed was some layout and a few result specific rules. DocSearch shipped a full theme with its own token set for the same UI.

## Building the search.json

There is no API to query anymore, so the search downloads a static index instead, and that index is built along with the rest of the site.

This is an Astro feature I don't see mentioned nearly enough: a file in `src/pages` does not have to output HTML.
Name it `search.json.ts`, export a `GET` that returns a `Response`, and the build writes it out as `/search.json`.

```ts
// src/pages/search.json.ts
export async function GET() {
  const records = [];

  // collect whatever you want in here

  return new Response(JSON.stringify(records), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
```

That is the whole thing. It runs once at build time, so what you get is a static file, same as every page.

A web manifest is the example I would start with, since almost every site has one and almost everyone keeps it by hand.
Move it to `manifest.webmanifest.ts` and the name, description and theme color can come from the same config your layout already reads, so there is one source of truth and no chance of the two drifting apart.

For the search the endpoint calls `getCollection()` for each collection I want indexed, and then `render()` on every entry, because that hands back the headings with the anchors Astro itself generated.
Reusing those means a search result can never link to a heading that does not exist.

After that it is only filling an array, and this is where the collections really pay off, since every entry already declares most of what a record needs.
There are two shapes to them: one record for the page, and one for each of its sections, whether that section is a heading or an FAQ entry.
A record holds what a page declares about itself, so its description, tags, headings and FAQ questions, but not the page body and not the FAQ answers.
That keeps the index flat as pages get longer, and it only grows when I add a page or a section.

The one thing I do pull out of the body is the CSS custom properties a page documents, since someone searching for `--btn-bg` expects the page that documents it, and that name appears nowhere else.
Code fences that are not CSS get skipped, otherwise a `--save-dev` in an install example ends up in the index.

The keys are single letters, since the whole file goes over the wire in one go, and `u` beats `url` a few hundred times over.

The [full endpoint] is on GitHub if you want to see all of it.

## The trade off

All of that comes down to 456 records covering 67 pages, which is 100.2 KB raw, or 14.5 KB gzipped, and the reader has to download it.

So for someone who opens the search on their very first page:

| Cases                    | DocSearch                     | Custom  |
| ------------------------ | ----------------------------- | ------- |
| On every page view       | 37.8 KB                       | 2.7 KB  |
| Once, only if you search | It depends, it queries an API | 14.5 KB |
| Worst case total         | 37.8 KB                       | 17.2 KB |

It comes out smaller either way, and the shape of the cost changes too:

- It is data, not script, so there is no parse, compile or execute step.
- It is fetched once and then cached, instead of a request to Algolia per keystroke.
- It is same origin, so no third party DNS lookup, TLS handshake or connection.
- Searching happens in memory, so results appear as fast as you can type.
- Nothing at all is fetched for the readers who never search, which is most of them.

That is the "only send what the user needs" idea again, this time applied to my own code.

### What I gave up

Custom properties aside, a phrase that only appears in the page body, or only in an FAQ answer, will not find its page.
Results still land on the right section, because every heading and every FAQ question gets a record of its own, but the snippet under them is the page description rather than the surrounding sentence.

In exchange the index cannot balloon, and it pushed me to write better descriptions, keywords and FAQ entries, which the pages needed anyway.

## Why not use Pagefind?

The thought did cross my mind. [Pagefind] is the obvious answer here, and if you want a search that simply works, it is a good one.

But it is not cheap when it comes to size either, and size was the whole reason I started.
It is easier to set up, and it handles a growing index better than I do, since it splits the data into chunks instead of shipping one file.
It also has to cover every case a site can throw at it, where I only had to cover mine, and that is most of the size difference right there.

I also liked the idea of building one myself, just to see how small I could get it.
And building something like this with AI is so much easier these days, so it is genuinely worth trying if your site is a normal size.

If your site is a lot bigger, then yes, DocSearch or Pagefind will serve you better, because they are built to handle that much data.
Every solution has its trade off, so pick the one that fits your site.

## Was it worth it?

For me, yes, but it is not free. The custom search is around 1,060 lines across four files, where the component that wired up DocSearch was 168.
That is a lot more code to own, but what actually reaches the reader went from 37.8 KB to 2.7 KB. I would make that swap again.

What surprised me is how little of it was new work. The collections were already carrying the descriptions, tags and FAQ entries, so most of the index was sitting there waiting for me.
The dialog needed almost no CSS either, since Fylgja already styles plain HTML.

So the Fylgja site is now officially free of third party JavaScript.
Not bad for a dialog with a list in it 😉

[Astro.js]: https://astro.build/
[11ty]: https://www.11ty.dev/
[Fylgja CSS]: https://fylgja.dev/
[DocSearch]: https://docsearch.algolia.com/
[Algolia]: https://www.algolia.com/
[Preact]: https://preactjs.com/
[Pagefind]: https://pagefind.app/
[full endpoint]: https://github.com/fylgja/site/blob/main/src/pages/search.json.ts
