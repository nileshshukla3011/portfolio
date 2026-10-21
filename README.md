# Nilesh Kumar Shukla — Portfolio

A fast, responsive portfolio in plain HTML, CSS and a little JavaScript. No build step.

## Local preview

The projects are loaded from `data/projects.json`, so serve the folder instead of double-clicking `index.html`:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing

| What | Where |
| --- | --- |
| Name, intro, about, experience | `index.html` |
| Projects | `data/projects.json`. `featured` are the big cards under **Recent work**; `earlier` are the small cards below them |
| Mini UI preview on a featured card | the card's `preview` key (`jobbot`, `cms`, `mortuary`, `mgims`, `naturefrost`), drawn in `scripts.js` → `previews` |
| Headline typing words | `scripts.js` → `words` |
| Colours and fonts | `styles.css`, under `:root` (light) and `html.dark` (dark, the default) |

A featured project's `demo` and `repo` links are optional: leave them out for private or internal projects and the buttons are hidden.

## Resume requests

The **Request resume** buttons open a short form. The visitor's message is sent to you on WhatsApp (`wa.me`) or by email (`mailto:`). It opens their WhatsApp or email app with the message filled in, so no server or API key is needed. Change the destination in `scripts.js`:

```js
const CONTACT = {
	email: 'nilesh.shukla47@gmail.com',
	whatsapp: '917366866911' // country code + number, no "+"
};
```

## Testimonials

Submitted testimonials are stored in the visitor's own browser (`localStorage`). Other visitors don't see them.

## Deploy

Push to `main`; Vercel (or GitHub Pages / Netlify) serves the folder as-is. All paths are relative, so it also works from a sub-path.

## License

MIT
