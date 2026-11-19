# k11e.com

Published static assets for [k11e.com](https://k11e.com).

The Astro source, editorial proposals and private research are maintained separately. This repository contains only the reviewed production output in `site/`, not private drafts or development previews.

Cloudflare Pages builds with `yarn build`; `publish.mjs` copies the reviewed `site/` publication to `dist/`. Update this repository by building the Astro publisher and replacing `site/` with that production output. Do not hand-edit generated pages.

The previous website remains in Git history and the `before-k11e-redesign-20261119` branch for rollback.
