<div align="center">
  <img src="ext/public/icon/icon.png" width="112" alt="CookieCloud">
  <h1>CookieCloud</h1>
  <p><strong>Encrypt and synchronize browser cookies and optional local storage with your own server.</strong></p>
  <p>This fork keeps the lightweight, self-hosted design of the upstream project and adds a Mozilla-signed Firefox Desktop build.</p>

  <p>
    <a href="README_cn.md">简体中文</a> ·
    <a href="README.md">English</a> ·
    <a href="https://github.com/NeoHeee/CookieCloud/releases/tag/firefox-v1.0.3">Latest release</a> ·
    <a href="PRIVACY.md">Privacy notice</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Firefox-1.0.3-FF7139?logo=firefox-browser&logoColor=white" alt="Firefox 1.0.3">
    <img src="https://img.shields.io/badge/Mozilla-signed-success" alt="Mozilla signed">
    <img src="https://img.shields.io/badge/self--hosted-recommended-4C9A2A" alt="Self-hosted recommended">
    <img src="https://img.shields.io/badge/license-GPL--3.0-blue" alt="GPL-3.0">
  </p>

  <p>
    <a href="https://github.com/NeoHeee/CookieCloud/releases/download/firefox-v1.0.3/CookieCloud-Firefox-v1.0.3-signed.xpi"><strong>Download the signed Firefox build</strong></a>
  </p>
</div>

---

## What is CookieCloud?

CookieCloud is a lightweight cookie synchronization system made of a browser extension and a self-hostable server. The extension reads cookies within the scope selected by the user and, when explicitly enabled, matching website local-storage values. The payload is encrypted locally in the browser before it is sent to the server configured by the user.

This repository is forked from [easychen/CookieCloud](https://github.com/easychen/CookieCloud) and adds:

- Firefox Desktop build and compatibility metadata;
- a Mozilla-signed `.xpi` for self-distribution;
- reproducible GitHub Actions builds and packaged-manifest checks;
- an AMO source-review bundle and privacy notice;
- clearer installation, security, and self-hosting documentation.

> This is a community-maintained Firefox adaptation. It is not an official public Firefox Add-ons Store release from the upstream author.

## Browser support

| Browser | Status | Distribution |
|---|---|---|
| Firefox Desktop | ✅ Tested and Mozilla-signed | GitHub Releases in this repository |
| Chrome | ✅ Supported upstream | Chrome Web Store |
| Microsoft Edge | ✅ Supported upstream | Edge Add-ons |
| Firefox for Android | 🧪 Not declared compatible yet | Separate adaptation and device testing planned |
| Other Chromium browsers | ⚠️ Often work, but not fully verified | Refer to upstream documentation |

Firefox and Chromium use different cookie representations. **Do not use the same upload UUID for Firefox and Chrome/Edge**, or one browser may overwrite data from the other.

## Install on Firefox

1. Download [CookieCloud-Firefox-v1.0.3-signed.xpi](https://github.com/NeoHeee/CookieCloud/releases/download/firefox-v1.0.3/CookieCloud-Firefox-v1.0.3-signed.xpi).
2. Open Firefox **Add-ons and themes**.
3. Open the gear menu and choose **Install Add-on From File**.
4. Select the downloaded `.xpi` and approve the installation.
5. Open CookieCloud and configure your server URL, a Firefox-specific UUID, and a strong password.

The signed build remains installed after Firefox restarts and does not require temporary loading through `about:debugging`.

## Security first

Cookies are high-value authentication credentials. CookieCloud needs broad permissions to read and restore cookies and website data, so treat it as a sensitive security tool:

- Prefer a trusted self-hosted CookieCloud server instead of a public test service.
- Use HTTPS for all remote access; never expose the service over plain public HTTP.
- Generate independent random UUID and password values; use at least a 24-character password.
- Do not synchronize online banking, payments, primary email, password managers, domain registrars, Cloudflare, NAS administration, or other critical accounts.
- Local storage may contain long-lived tokens. Leave it disabled unless it is required.
- Consider a dedicated browser profile containing only sites that genuinely need synchronization.
- Rotate credentials periodically and delete server-side and local data when the service is retired.

CookieCloud encrypts synchronization content locally before upload, but encryption does not eliminate the risks of weak passwords, a compromised browser, a malicious server, or leaked configuration. See the [privacy notice](PRIVACY.md).

## Self-host the server

### Docker Compose

```yaml
services:
  cookiecloud:
    image: easychen/cookiecloud:latest
    container_name: cookiecloud
    restart: unless-stopped
    ports:
      - "8088:8088"
    volumes:
      - ./data:/data/api/data
    environment:
      # Replace this with a long, unpredictable path.
      API_ROOT: /cookiecloud-your-random-path
```

Start the service:

```bash
docker compose up -d
```

Example server URL in the extension:

```text
https://cookie.example.com/cookiecloud-your-random-path
```

For production use, place CookieCloud behind a trusted HTTPS reverse proxy or Cloudflare Tunnel. Do not expose port `8088` as plain HTTP on the public internet.

### Docker command

```bash
docker run -d \
  --name cookiecloud \
  --restart unless-stopped \
  -p 8088:8088 \
  -v "$PWD/data:/data/api/data" \
  -e API_ROOT=/cookiecloud-your-random-path \
  easychen/cookiecloud:latest
```

## Synchronization model

CookieCloud is currently best used as a one-way synchronization system:

- one browser acts as the uploader;
- other clients or applications consume the uploaded data;
- avoid multiple browsers uploading to the same UUID;
- keep Firefox and Chromium UUIDs separate.

The synchronized format contains cookies and, when enabled, local-storage data. Extension configuration is stored locally in the browser.

## Build the Firefox package

```bash
git clone https://github.com/NeoHeee/CookieCloud.git
cd CookieCloud/ext

corepack enable
corepack prepare pnpm@10.28.0 --activate
pnpm install --frozen-lockfile
pnpm compile
pnpm zip:firefox
```

The unsigned build is created under:

```text
ext/dist/*firefox*.zip
```

Unsigned ZIP files are intended for development and temporary testing. For normal Firefox installation, use the Mozilla-signed `.xpi` published in Releases.

See [ext/AMO_BUILD.md](ext/AMO_BUILD.md) for complete reproducible build details.

## API summary

Upload:

```text
POST /update
uuid=<UUID>
encrypted=<ENCRYPTED_PAYLOAD>
```

Download:

```text
GET /get/:uuid
POST /get/:uuid
```

The server stores the encrypted payload submitted by the extension. Refer to the upstream project for implementation details and cross-language decryption examples.

## Upstream and license

- Upstream project: [easychen/CookieCloud](https://github.com/easychen/CookieCloud)
- Firefox fork: [NeoHeee/CookieCloud](https://github.com/NeoHeee/CookieCloud)
- Privacy notice: [PRIVACY.md](PRIVACY.md)
- License: [GNU General Public License v3.0](LICENSE)

Thanks to easychen and every upstream contributor. Changes in this repository remain available under GPL-3.0.