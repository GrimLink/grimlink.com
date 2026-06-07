---
title: "Working on OKLCH Colors for Fylgja"
description: "Last week, we worked on the Fylgja colors package, focusing on the new oklch color spec. We created a beautiful color palette."
pubDate: "2023-05-29"
tags: ["css", "fylgja-css"]
crossPosts:
  mastodon: "110450740603893276"
---

Last week, Ruud van Zuidam and I worked on the Fylgja CSS colors package, focusing on the new oklch color spec. We created a beautiful color palette. We're still working on refining the color conversion to HSL and HEX, using Lea Verou's ColorJS package.

Interestingly, we found that using clipping as the solution actually yielded better results than the color conversion functionality provided by Chrome DevTools.

Also shout out to Adam Argyle for the helpful oklch video on the ChromeDev YouTube channel.
