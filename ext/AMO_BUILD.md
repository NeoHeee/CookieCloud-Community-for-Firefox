# CookieCloud Firefox — AMO Build Instructions

This document describes how to reproduce the unsigned Firefox extension package submitted to Mozilla Add-ons (AMO).

## Source layout

The Firefox extension source is located in the `ext/` directory. The project uses WXT, TypeScript, React, Vite/Rollup, and pnpm. Generated output is written to `ext/dist/`.

## Required build environment

- Operating system: Ubuntu 24.04 LTS or another recent Linux distribution
- Node.js: 22.x
- pnpm: 10.28.0
- Network access during dependency installation: npm registry only

The exact package-manager version is also pinned in `ext/package.json`, and all JavaScript dependencies are locked in `ext/pnpm-lock.yaml`.

## Build commands

Run these commands from the repository root:

```bash
cd ext
corepack enable
corepack prepare pnpm@10.28.0 --activate
pnpm install --frozen-lockfile
pnpm compile
pnpm zip:firefox
```

The resulting unsigned Firefox package is created under:

```text
ext/dist/*firefox*.zip
```

## Build notes

- No environment variables, API keys, secrets, or private services are required.
- The build does not download or execute remote code at runtime.
- `pnpm install --frozen-lockfile` must be used so dependency versions exactly match the lockfile.
- WXT bundles the extension source and dependencies into the submitted package.
- The Firefox-specific manifest metadata is generated from `ext/wxt.config.ts`.

## Verification

The GitHub Actions workflow `.github/workflows/build-firefox.yml` performs the same build and verifies that the packaged `manifest.json` contains:

- Add-on ID: `cookiecloud-firefox@neoheee.github.io`
- Required data categories: `websiteContent` and `browsingActivity`

The workflow also produces a separate AMO source archive containing these instructions and all source files required to reproduce the extension package.
