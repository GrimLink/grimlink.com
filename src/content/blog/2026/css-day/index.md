---
title: "My first time at CSS Day"
description: "A reflection on my first time attending CSS Day, including my experience and learnings."
image: "photo-of-me-with-kevin.jpg"
thumb: "css-day-logo.jpg"
pubDate: 2026-06-14
tags: ["events", "css", "design-tokens", "fylgja-css", "games"]
---

This year I finally decided I needed to go to CSS Day, prevoius years I was hecitand since this not one of the cheaper events to go to but this year the lineup was to good not not go.

> And spoiler alert, that was confirmed and more 🤩

## Day 1

First my day started very early getting on the train and heading to Amsterdam, sadly forgot my headset so no music for me 😢
None the less I was full of energy and anxious and excited to finnaly meet some of my CSS Hero's.

When arving I was early so had to wait a few miniutes but after I got in, I inmedatly spotted the CSS Doom stand, when getting a coffee.

![Two screens with CSS Doom displayed using PS5 Controlers](css-doom.jpg)

Now I played [CSS Doom](http://cssdoom.wtf/) before, but never with a PS5 control, I wanted to give it a try but I found a old friend when entering so that had to wait.

After talking with my friend, decide to chake some hands and fan out at some of my hero's.

Just before the talks started I spotted Kevin Powell talked with him and his wife, not even about code also the cities here in the Netherlands, including Zwolle.

After that I wanted to take my seat and make a photo of Kevin but his wife spottet me and asked if I wanted a selfy, which I wanted gladly.

![Photo of me with Kevin](photo-of-me-with-kevin.jpg)

_Many thanks to Kevin's Wife for suggesting and taking the picture._

We started the day with Bruce Lawson, who was the MC for Day 1 having a blast with the anoucing the speakers and asking the questions, we could alos send in via Bluesky.

After that, the first talk was from [Lea Verou](https://lea.verou.me/) who spoke about colors and her anoyance on the fact we can't do a proper gamut.
she explained how colors worked and shared how browser at the moment clip colors giving inacurat values.

I funny enouch, did not know why, but did expience this when building the hue based colors for Fylgja CSS v2.
So good stuff to understand.

After this we had a break and I am not going the mention every break but what I always say, events are not just about the sesions also about the people, had a few good talks tougth the two days.

but now back to the next sesion, this time by Josh Tumath, who shared about os basd text sizing and how it could impact you sites.
I heard of the new tag but did not investage it, but Josh's talk went fully in about the how and why.

After his talk we want right into the next talk this time by Jelle Raaijmakers, who had his talk about 'The value pipeline', which was more about how complex it is to build a new browser and what all comes with it explaining the complexities we take for grandit when writing CSS and what browser vendors all how to implement so we can build cool stuf.

After the lunch we went strait in to more mind bolegling stuff the talk from Lyra Rebane, blew my mind, she showed us how to build a x86 CPU that runs C code using CSS, trully mind bolegling.
Now if anyone says CSS is not a programing language, your wrong, see her x86 CPU in action at https://lyra.horse/x86css/

![Lyra Rebane showing the power of CSS](x86cpu.jpg)

After Lyra's talk we got the next talk by Sara Joy, she explained color scheming and how the mather to your users so it is not just a color choice but aslo a accesbilty feature.
She showed how to use this and how to leverage CSS functions, like `light-dark()` and `color-contrast()` to make this event easeier.

After the next break we have Bramus Van Damme showing use the power is View transistions, here he explained the many use cases for View transistions and that it does not need to be a page navigation that triggers view transistions, click or even scrolling can trigger View transistions and make a site feel more interactive, good stuff.

And we close of Day 1 with Jake Archibald, he went deep into the Customisable `<select>`, and the journey it had before we could use it.
All the way when from when the base slecte was proposed to now and what was all needed to use Customisable `<select>`, form Popover to Anchor posistioning.
I also never realized you could use anchor posistioning without giving it a name if you used the Popover Api.

Now after this I had a few good talk and beers and checked out the demo by Kilian Valkhof on [Polypane](https://polypane.app/), relizing what has been improved since the early days it packs so much more tools for devs to use and test there sites with even found a bug in [Fylgja CSS](https://fylgja.dev), so thats now fixed 😅

After that I went for some Ramen, had a to hurry a bit, spend to much time talking and drinking, so I was close to to the fact that they would close, but I was on time and was the last customer at RAMEN-ISM for some good Ramen 😊.

![Ramen](ramen.jpg)

## Day 2

On Day 2, I was a bit later, so the doors where already open, this time it was only a few miniutes walking from the hotel.

So it was no hurry had all the time before the first talk, like day 1 only with less travel time.

This day we swapped MC's and had Ana Rodrigues as our MC who also did a great job introducing the speakers.

With Day 2 we started with Kevin Powell, with his talk 'CSS is eating JavaScript'.
Now he explained how this is not the case and CSS is just getting more tools to do things that CSS should do in the first place and made a few good examples with his weather app example why this should be in CSS.
Keving showed servral newer CSS solutions including using; `attr()`, style queries and `if()`.

Then after the break we have Patrick Brosset from the Edge team explain grid lanes and how they work, he even had a trippy example of many lanes just to see how far he could push the browser, in this case Safari.

He even showed a few game examples like pacman and pong.

![Pong](pong.jpg)

Then Manuel Matuzović started his talk with a few alternative titles for his talk and how mental healt is more important then effectiveness.
His talk explored CSS Resets worked and if we still should use those solutions, one thing I liked is that Manuel brought up that we could use inline styles if is is just a CSS varible.
He walked trough a few of his own UI default, not naming it a reset and how to customize this at the end he showed his onw classless CSS framework [oli.css](https://olicss.com/).

The talk from Niels Leenheer was defently the best talk this year.
He shared his pasion for lazers, he showed how he build a clock with a svg and how he displayed this with the power of math on his oscilloscope, which did not catch fire like in his prevoius expiriments.
After this went a step furter and showed Astriods and the Chrome Dino on the oscilloscope.

![Chrome's dino run on a Oscilloscope](lazer-dino.jpg)

After this he went even a step furter while lagey he showed Doom's E1M1 on the oscilloscope.

Niels continued his talk explaining how he made Doom in CSS, while not 100% CSS he did the parts that CSS could do with it.
So Doom CSS is a big list of divs build using JS that reads the orginal game data to render divs with the CSS variables that hold each part of the game data would translate back into CSS.
Then he showed the CSS logic that would handle each CSS variable and how that would render the level.

And he showed a version with cats as the level backgrounds 😆

<div class="md-row">

![](doom-cats-message.jpg)
![](doom-cats.jpg)

</div>

Now he ended his talk with a Lazer, since this was the title of the talk.
So he showed the same things he showed on the oscilloscope on a lazer, awesome, but limited when the shape needs more complexity, like the doom example.

> Now if you never played CSS Doom, give it a try at http://cssdoom.wtf/.

Then after Niels we had Eric Meyer explaining `offset-path` and the many things that you can use it for, with a lot of Ray's.

![Thats a lot of Rays](rays.jpg)

Then after the break we had two more talks by two who have made a lot of videos together; Una Kravets and Adam Argyle.

First was Una Kravet with Modern UI Patterns, here Uno showed a few examples of how you can use modern CSS like `scroll-state` to improve your pages as a progresive enhancement.
Uno also explained a few do's and don't on your sites and showed for example the web version of Google Photos taking up 40% of the screen which is just bad for the users.
So the example of `scroll-state` could really improve the page if used.

Now she also dived into the UX of tooltips and how to use them, with the new popover hint and how this can be styled with anchor positioning.
Including a mobile UX pattrent if we should have the info mark as icon after it by default or have it as a opt-in, I agree, it should be a opt-in.

If you interested here is the issue Uno shared in her slides: [w3c csswg-drafts #13980](https://github.com/w3c/csswg-drafts/issues/13980)

Now we closed the day with the last talk from Adam Argyle who showed use why we should improve our CSS with better pattrents like logical properties and other media queries that are beter at detecting certain cases.
He showed why design tokens but also that you should not have a list of many colors, funny enough Adma showed the [Open Props v2](https://opv2-beta.netlify.app/color/) which will use a new design token system for colors, which looked very familiar to me since, I have something like that in [Fylgja CSS](https://fylgja.dev/library/tokens/#colors) 😁

Now Adam showed had alot more examples but his main focus was on the fact that CSS Components shpuld be aware of the there seroundings and should react to the envirment around it.

Now at the end he showed his new JS library that adds CSS varibales for certain things, we sadly can not (yet) do with CSS, this mini library will add options like where is the cursor and many more.
Will defently try out his new library [prop for that](https://prop-for-that.netlify.app/) to see how I could apply this in the wild.

Now would I say CSS day was worth atending yes defently, I would have been so sad if I missed it, this was a blast in many ways, good talks, good conversations and many insperations I learned that I can apply in my day to day work and to Fylgja CSS.

![All the speakers and event orginizers of CSS Day](the-speakers.jpg)
