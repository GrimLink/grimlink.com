---
title: "Can't wait for bfcache support in Magento2"
description: "Waiting for Adobe Commerce to merge a PR is like watching paint dry, but I'm far too excited about the performance gains to just sit around."
pubDate: 2026-05-13
pubSource: "https://www.linkedin.com/posts/seanvanzuidam_github-grimlinkmagento-patch-bfcache-activity-7460290705064681473-qY94"
tags: ["magento2", "performance"]
---

Waiting for Adobe Commerce to merge a PR is like watching paint dry, but I’m far too excited about the performance gains to just sit around.

After Akif Gumussu shared how to apply the PR as a patch using n98-magerun2, I decided to take it a step further for everyone’s deployment pipelines.
I’ve built a dedicated repository to hold the patch, making it easy to pull in via cweagans/composer-patches or any other composer workflow.
I’ve even baked this into my own Mage script so all my projects get these speed improvements by default.

If you can't wait to get your hands on bfcache support and want to jump-start your performance today, check out the patch here: https://github.com/GrimLink/magento-patch-bfcache
