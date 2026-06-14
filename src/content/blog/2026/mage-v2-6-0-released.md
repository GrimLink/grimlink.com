---
title: "Mage v2.6.0 Released"
description: "Exciting updates in Mage 2.6.0! New commands like mage new store and mage nuke, plus enhanced mage add for Git repositories."
pubDate: 2026-03-08
tags: ["magento2", "tools"]
crossPosts:
  linkedin: "seanvanzuidam_release-v260-grimlinkmage-activity-7436443218235453442-yYGj"
---

🚀 Exciting updates in Mage 2.6.0!

If you work with Magento 2 locally and haven't tried Mage yet, it's a CLI tool designed to make your development workflow significantly faster and less repetitive.

We've just pushed version 2.6.0, and it brings some massive quality-of-life improvements for local environment management. Here are the highlights:

🏪 **mage new store**
Creating a new store view programmatically used to be a hassle of manual config. Now, with a single command, you can instantly scaffold a new store view. It automatically configures the Magento base URLs and handles the local environment domain setup for you!

💥 **mage nuke (or mage destroy)**
Sometimes you just need to start fresh. This new command safely but permanently wipes out your current Magento project, dropping the database, removing environment files, and clearing the directory so you can rebuild without leaving ghosts behind.

📦 **Enhanced mage add**
Need to test a module from a raw Git repository? You can now pass a Git URL directly into `mage add`. It will automatically clone the repo into your package-source directory and configure it as a local composer requirement. No more manual symlinking or composer json wrestling!

We've also shipped much smarter logic for handling Hyvä Themes installations (Checkout & Commerce) and cleaned up a ton of under-the-hood logic.

🔗 Check out the repository: [github.com/GrimLink/mage](https://github.com/GrimLink/mage)

📦 View the full [2.6.0 release notes](https://github.com/GrimLink/mage/releases/tag/v2.6.0)
