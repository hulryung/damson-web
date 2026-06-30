# damson-web

Documentation & marketing site for [**Damson**](https://github.com/hulryung/damson) —
*the terminal built only for macOS.*

Built with [Nextra 4](https://nextra.site) (Next.js App Router) and deployed on
Vercel at [damson.app](https://damson.app).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # next build + Pagefind search index (postbuild)
npm run start    # serve the production build locally
```

The `postbuild` step runs Pagefind to generate the full-text search index into
`public/_pagefind`. It runs automatically as part of `npm run build`, including
on Vercel.

## Content

All documentation lives in [`content/`](./content) as MDX. Sidebar order and
titles are controlled by the `_meta.js` files. To add a page, drop a new `.mdx`
file in `content/` (or `content/features/`) and add an entry to the relevant
`_meta.js`.

Brand assets (`og.png`, `logo.png`, `icon.png`) live in [`public/`](./public)
and are copied from the main Damson repository.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it in Vercel — the framework is auto-detected as Next.js; no extra
   configuration is needed.
3. Add the custom domain **damson.app** under **Project → Settings → Domains**,
   then point the domain's DNS at Vercel (an `A` record to Vercel's IP, or the
   apex/`CNAME` records Vercel shows you).

Every push to `main` ships to production; pull requests get preview URLs.
