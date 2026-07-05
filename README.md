# For K 🦋

"The Memory Jar" — a jar of fireflies, built with React + TypeScript + Vite.
Each firefly carries one phrase of your message. Tap them in any order to
catch them; each one dissolves the soft light hiding its phrase in the card
below, until the full message has assembled itself.

## Edit the content

Everything personal (her name, the message split into phrase fragments, the
finale copy) lives in one file: [`src/content.ts`](src/content.ts). Edit it,
save, and the site updates — see the `Fragment` type in [`src/types.ts`](src/types.ts)
for the shape. Fragments join with a single space in the order they're listed,
so keep that in mind if you edit the wording.

## Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Tap/click the fireflies in the jar.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite — framework preset "Vite", build command `npm run build`,
   output directory `dist`. Just click Deploy.
4. You'll get a live URL (e.g. `for-k.vercel.app`) to send her.

## Deploy to GitHub Pages instead

1. `npm install -D gh-pages`
2. In `vite.config.ts`, add `base: '/<your-repo-name>/'`.
3. Add to `package.json` scripts: `"deploy": "vite build && gh-pages -d dist"`.
4. Run `npm run deploy`, then enable Pages in the repo settings (source: `gh-pages` branch).
