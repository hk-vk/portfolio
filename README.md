# hari.works

I'm Harikrishnan, a full-stack developer. [hari.works](https://hari.works) is my personal site, with projects I've built, blog posts, and ways to get in touch.

I've rebuilt it a few times. The archive keeps earlier versions around so you can browse the actual sites, not just screenshots.

## Run locally

```sh
pnpm install
pnpm dev
```

For blog content and analytics, copy `.env.example` to `.env.local` and fill in the relevant values. Keep API keys out of version control.

```sh
pnpm build
pnpm preview
```

The production build goes into `dist/`. The site uses React, Vite, Tailwind CSS, Framer Motion, and Lenis.

## Credits

Some parts of this site started with other people's work:

- The archive timeline adapts [Evil Rabbit's Lifeline](https://lifeline.evilrabbit.com/).
- The Waves and MagnetLines components come from [React Bits](https://reactbits.dev/), with changes for this site.
- Icons come from [Hugeicons](https://hugeicons.com/) and [Tabler Icons](https://tabler.io/icons), through [Iconify](https://iconify.design/).
- The fonts are [Syne](https://fonts.google.com/specimen/Syne) and [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans).
