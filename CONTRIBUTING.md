# Contributing to Crispwrite

Thanks for contributing — this project is intentionally simple and beginner-friendly.

## Local development

1. Install dependencies: `npm install`
2. Start local dev server: `npm run start`
3. Build production output: `npm run build`

## Pull request checklist

- Keep public site files under `src/`
- Keep changes focused and documented
- Run `npm run build` before opening PR
- Include screenshots for visual/UI changes
- Update README/docs when behavior changes

## Content and publishing rules

- Add posts under `src/blog/`
- Keep front matter complete (`title`, `description`, `date`, `tags`, `draft`)
- Draft posts (`draft: true`) are excluded from blog/tag collections
- Use meaningful headings and descriptive alt text

## Useful commands

- `npm run new:post -- "Post title"` creates a draft post template
- `npm run build:strict` runs a metadata-validated build (used in CI)

## Metadata quality

Update `src/_data/metadata.js` before publishing:

- real site URL
- author name
- social handles/links

In CI, placeholder metadata fails the build.
