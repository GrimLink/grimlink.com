---
title: "Early Experimentation with MPA View-Transitions"
description: "The view-transitions feature for MPAs works really well. Enabling it with a Chrome flag and a meta tag gives you smooth transitions without JavaScript."
pubDate: "2023-08-21"
tags: ["css", "chrome"]
crossPosts:
  mastodon: "110928566413653249"
---

The view-transitions feature for MPAs works really well. I haven't experimented with it too much yet, but enabling it with the Chrome flag and adding the meta tag will give you smooth page transitions out of the box, without any JavaScript.

Try it out with: 

```
chrome://flags#view-transition-on-navigation
```

and adding the meta tag to your site:

```html
<meta name="view-transition" content="same-origin" />
```

Also check out some cool other posts, that also talk about this:

- [Dave Rupert: Getting Started with View Transitions](https://daverupert.com/2023/05/getting-started-view-transitions/)
- [Chris Coyier on Twitter/X](https://twitter.com/chriscoyier/status/1656749296128086016)
- [Chip Cullen: Adding View Transitions API](https://chipcullen.com/adding-view-transitions-api/)
