# Crispwrite

A clean, minimal, and fast Eleventy blog starter built with Tailwind CSS.

## Demo

- https://crispwrite.netlify.app/

## Highlights

- Public content isolated under `src/`
- Blog, tags, and built-in client-side search
- Draft workflow (`draft: true`) so unpublished posts stay private
- RSS feed, sitemap, social metadata, and custom 404
- Accessibility-first defaults (skip link, focus states, keyboard-friendly menu)
- CI build with strict metadata validation in pull requests

## Project structure

```text
src/
  _data/        # Site metadata/helpers
  _includes/    # Layouts + partials
  assets/       # CSS + images
  blog/         # Markdown posts
  tags/         # Tag index + tag pages
  search/       # Search page
```

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/deepakness/crispwrite.git
cd crispwrite
npm install
```

### Configure metadata (required)

Before publishing, update placeholders in `src/_data/metadata.js`:

- `url`
- `author.name`
- social handles/links

CI enforces strict metadata checks via `npm run build:strict`.

### Run locally

```bash
npm run start
```

Open http://localhost:8080.

### Production build

```bash
npm run build
```

Output is generated in `_site/`.

## Writing posts

Create a draft post scaffold:

```bash
npm run new:post -- "My New Post"
```

Then edit the generated file in `src/blog/`.

- Draft posts use `draft: true` and are excluded from site output collections.
- Add tags in frontmatter to power tag pages and search.

## Search and tags

- Search page: `/search`
- Tags index: `/tags`

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
