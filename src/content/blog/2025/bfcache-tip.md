---
title: "BFCache Tip"
description: "Ever navigate back on a mobile site and find the menu still open?"
pubDate: "2025-08-12"
image: "@/assets/gist.jpg"
tags: ["performance"]
crossPosts:
  linkedin: "seanvanzuidam_alpinejs-bfcache-example-activity-7360996198435975168-eKqD"
---

Ever navigate back on a mobile site and find the menu still open? 🤔
That's the Back/Forward Cache (BFCache) at work.

While great for performance, it can create a clunky user experience by preserving UI states you'd rather reset.

Inspired by a recent post from Erwin Hofman,
I put together a couple of lightweight snippets to solve this.

They detect when a page is restored from BFCache and cleanly close the mobile menu.

Here are the solutions:
- [AlpineJS / Hyva](https://gist.github.com/GrimLink/a7bfd9152cfb81d32cc8e2a183ff09ef)
- [Plain JavaScript](https://gist.github.com/GrimLink/29b430164f9f03aa54c67696eb32f8f4)

It's a small improvement for a smoother UX. Hope this helps someone!
