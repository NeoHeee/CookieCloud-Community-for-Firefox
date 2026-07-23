# CookieCloud Firefox — AMO Build Instructions

This document describes how to reproduce the unsigned Firefox Desktop and Firefox for Android extension package submitted to Mozilla Add-ons (AMO).

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

The same package is used for Firefox Desktop and Firefox for Android. Platform compatibility is declared in the generated manifest.

## Build notes

- No environment variables, API keys, secrets, or private services are required.
- The build does not download or execute remote code at runtime.
- `pnpm install --frozen-lockfile` must be used so dependency versions exactly match the lockfile.
- WXT bundles the extension source and dependencies into the submitted package.
- The Firefox-specific manifest metadata is generated from `ext/wxt.config.ts`.
- Firefox for Android compatibility is declared with `browser_specific_settings.gecko_android` and a minimum supported version of Firefox 120.

## Verification

The GitHub Actions workflow `.github/workflows/build-firefox.yml` performs the same build and verifies that the packaged `manifest.json` contains:

- Version: `1.0.4`
- Add-on ID: `cookiecloud-firefox@neoheee.github.io`
- Firefox Android minimum version: `120.0`
- Required data categories: `websiteContent` and `browsingActivity`

The workflow also:

- runs TypeScript validation;
- runs Mozilla `web-ext lint` against the packaged extension;
- produces a separate AMO source archive containing these instructions and all source files required to reproduce the extension package.

## Android testing note

Manifest declaration and automated linting do not replace device testing. Before public AMO release, test installation, configuration, upload, download, scheduled synchronization, and Local Storage synchronization on a physical Android device or Android emulator running Firefox 120 or later.
