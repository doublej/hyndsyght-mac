# hyndsyght for Mac

The website of **hyndsyght for Mac**, a native macOS time tracker: https://doublej.github.io/hyndsyght-mac/

Downloads are on the [releases page](https://github.com/doublej/hyndsyght-mac/releases). The app's
source is not in this repo. The open-source Python version lives at
[doublej/hyndsyght](https://github.com/doublej/hyndsyght) and shares its data with the Mac app.

The site is SvelteKit in `docs/`, built and deployed to GitHub Pages by
`.github/workflows/deploy-docs.yml` on every push to `main` that touches `docs/`.

```sh
cd docs && bun install && bun run dev
```

Screenshots use made-up demo data, made with `scripts/make_demo.py` and `scripts/screenshots.sh`
in the app's repo.
