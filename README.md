# Nilesh Kumar Shukla — Portfolio

A fast, responsive portfolio built with React, TypeScript and Tailwind CSS (Vite).

## Local preview

Needs Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

Then open the address it prints (usually `http://localhost:5173`).

## Build

```bash
npm run build     # type-checks, then writes the site to dist/
npm run preview   # serves dist/ to check the production build
```

All paths are relative, so `dist/` also works from a sub-path.

## Editing

| What | Where |
| --- | --- |
| Projects | `src/data/projects.json`. `featured` are the wide cards under **Recent work**; `earlier` are the smaller cards below them |
| Project screenshot (earlier projects) | the card's `image` and `imageAlt` keys; put the file in `public/assets/projects/` |
| Mini UI preview on a featured card | the card's `preview` key (`jobbot`, `cms`, `mortuary`, `mgims`, `naturefrost`), drawn in `src/components/Previews.tsx` |
| Experience timeline | `src/content.ts` → `EXPERIENCE` (dates, `+` points, git-style tags) |
| Headline typing words, stats, skills, scrolling tech strip, social links | `src/content.ts` |
| Intro and about text | `src/components/Hero.tsx`, `src/components/About.tsx` |
| Profile photo | `public/assets/photo_profile_square.jpg` (square crop, face in the centre). `photo_profile.jpg` is the full photo used for link previews |
| Colours, fonts, animations, breakpoints | `src/index.css` — colour tokens under `:root` (light) and `html.dark` (dark, the default), Tailwind theme under `@theme` |

A project's `demo` and `repo` links are optional: leave them out for private or internal projects and the buttons are hidden.

## Resume requests

The **Request resume** buttons open a short form. The visitor's message is sent to you on WhatsApp (`wa.me`) or by email (`mailto:`). It opens their WhatsApp or email app with the message filled in, so no server or API key is needed. Change the destination in `src/content.ts`:

```ts
export const CONTACT = {
	email: 'nilesh.shukla47@gmail.com',
	whatsapp: '917366866911', // country code + number, no "+"
	phone: '+917366866911',
}
```

## Testimonials

Submitted testimonials are stored in the visitor's own browser (`localStorage`). Other visitors don't see them.

## Deploy

**Vercel:** push to `main`. `vercel.json` tells Vercel to run `npm run build` and serve `dist/`.

**GitHub Pages / Netlify / any static host:** run `npm run build` and publish the `dist/` folder.

## License

MIT
