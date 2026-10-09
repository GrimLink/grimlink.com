---
title: "Mage v3.0.0 Released"
description: "Mage 3 is a full rebuild: it works from any folder, knows your environment, and has one place to add things to your Magento project."
pubDate: 2026-10-09
tags: ["magento2", "hyva", "tools"]
---

🚀 Mage 3.0.0 is out, and this one is special.

If you have not tried [Mage] yet, it is a small tool on top of `bin/magento` that takes the repetitive work out of Magento 2 and Mage-OS development.
Version 3 is a rebuild from the ground up.
Most commands of version 2 are back, but the way they work underneath changed a lot, and that opened the door for a bunch of new things.

## Why a rebuild

Mage started as a handful of aliases, and over the years it grew into one big switch statement.
Every new command made the next one a bit harder to add.

So I split it up.
The source now lives in small files per command, per handler and per environment, and a build turns it back into the single script you download.
It comes with a test suite and CI that run on Linux and on the bash 3.2 that macOS ships with.
That made the rest of this release possible.

## Works from any folder

Mage now finds the Magento root on its own.
Deep in `app/code/Vendor/Module` and need to clean the cache?
Just run `mage cache:clean`, no need to `cd` back first.
Anything mage does not know still goes straight to `bin/magento`.

## Knows your environment

Local, [Laravel Valet], [Warden] and now also [DDEV]: mage detects how your project runs, and runs its commands where they belong.
So `mage cache:clean` runs inside the container with Warden or DDEV, without you typing `warden env exec` every time.

And `mage clean` is a lot more careful.
On a shared Redis it only clears the keys of the project you are in, instead of flushing the cache of every other project on your machine.

## One place to add things

`mage add` is now the central command for anything you add to a project:

- **Composer packages:** `mage add vendor/package`, the same as `composer require`.
- **Git repositories:** `mage add git@github.com:vendor/package.git` clones it into `package-source` and requires it.
- **Composer fragments:** `mage add composer-hyva.json` applies the repositories, auth and packages from a json file, asking for placeholders such as your license key.
- **Generators:** `mage add theme`, `mage add module`, `mage add store`, `mage add admin` and more.
- **Sample data:** `mage add sample` now also offers the new Koti sample data of Hyvä, next to the Luma sample data.
- **Patches:** `mage add patch vendor/package` turns your changes in vendor into a composer patch, and `mage add bfcache` adds the [BFCache patches].

The old `mage new` commands are now part of `mage add`.

## Fast insight

`mage info` and `mage open` used to call `bin/magento` up to eight times.
Now they ask Magento once, so they are a lot faster, and they also respect a custom admin url.
`mage show` lists your stores, themes, modules, logs and the full page cache in use.

## Ready for scripts and agents

More and more of my work runs through scripts and AI agents, and they can not answer questions in a terminal.
So mage no longer quietly takes a default when nobody can answer.
It stops and tells you which option to pass, `-y` takes the defaults, and `info` and `show` can print json.

## Your own config

Every default, from the admin user to the default packages, can now be changed in `~/.config/mage/config`.
Mage only loads it when it is yours and nobody else can change it, see the [security policy].

## Try it

Grab it from the new [Mage page], or update your current version with:

```bash
mage self-update
```

There is a lot more in this release than fits in one post, so check the [3.0.0 release notes] for every change, including the commands that did not make it back.

Happy coding! 🧙

[Mage]: /mage/
[Mage page]: /mage/
[Laravel Valet]: https://laravel.com/docs/valet
[Warden]: https://github.com/wardenenv/warden
[DDEV]: https://ddev.com/
[BFCache patches]: https://github.com/GrimLink/magento-patch-bfcache
[security policy]: https://github.com/GrimLink/mage/blob/main/SECURITY.md
[3.0.0 release notes]: https://github.com/GrimLink/mage/releases/tag/3.0.0
