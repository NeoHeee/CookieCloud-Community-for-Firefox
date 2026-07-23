<div align="center">
  <img src="ext/public/icon/icon.png" width="112" alt="CookieCloud">
  <h1>CookieCloud</h1>
  <p><strong>将浏览器 Cookie 与可选的 Local Storage 加密同步到你自己的服务器</strong></p>
  <p>保留原项目轻量、自托管的设计，并提供经过 Mozilla 签名的 Firefox Desktop 版本。</p>

  <p>
    <a href="https://github.com/NeoHeee/CookieCloud/releases/tag/firefox-v1.0.3">最新版本</a> ·
    <a href="PRIVACY.md">隐私说明</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Firefox-1.0.3-FF7139?logo=firefox-browser&logoColor=white" alt="Firefox 1.0.3">
    <img src="https://img.shields.io/badge/Mozilla-signed-success" alt="Mozilla signed">
    <img src="https://img.shields.io/badge/self--hosted-recommended-4C9A2A" alt="Self-hosted recommended">
    <img src="https://img.shields.io/badge/license-GPL--3.0-blue" alt="GPL-3.0">
  </p>

  <p>
    <a href="https://github.com/NeoHeee/CookieCloud/releases/download/firefox-v1.0.3/CookieCloud-Firefox-v1.0.3-signed.xpi"><strong>下载 Firefox 正式签名版</strong></a>
  </p>
</div>

---

## 这是什么

CookieCloud 是一套轻量的 Cookie 同步工具，由浏览器扩展和可自建的服务端组成。扩展读取用户指定范围内的 Cookie，并可在明确启用后同步对应网站的 Local Storage；数据在浏览器本地加密后，发送到用户配置的 CookieCloud 服务端。

本仓库复刻自 [easychen/CookieCloud](https://github.com/easychen/CookieCloud)，主要补充：

- Firefox Desktop 构建与兼容配置；
- Mozilla 非公开分发签名版 `.xpi`；
- GitHub Actions 可复现构建与 Manifest 校验；
- AMO 源码审核包和隐私说明；
- 更清晰的安装、安全及自建服务说明。

> 本仓库是社区维护的 Firefox 适配分支，不是原作者在 Firefox Add-ons 商店公开发布的官方版本。

## 浏览器支持

| 浏览器 | 状态 | 获取方式 |
|---|---|---|
| Firefox Desktop | ✅ 已测试、Mozilla 已签名 | 本仓库 GitHub Release |
| Chrome | ✅ 上游支持 | Chrome Web Store |
| Microsoft Edge | ✅ 上游支持 | Edge Add-ons |
| Firefox Android | 🧪 暂未声明兼容 | 后续单独适配与真机测试 |
| 其他 Chromium 浏览器 | ⚠️ 通常可用但未完整验证 | 参考上游说明 |

Firefox 和 Chromium 的 Cookie 数据结构存在差异，**不要让 Firefox 与 Chrome/Edge 使用同一个上传 UUID**，避免相互覆盖。

## Firefox 安装

1. 下载 [CookieCloud-Firefox-v1.0.3-signed.xpi](https://github.com/NeoHeee/CookieCloud/releases/download/firefox-v1.0.3/CookieCloud-Firefox-v1.0.3-signed.xpi)。
2. 在 Firefox 打开“扩展和主题”。
3. 点击右上角齿轮，选择“从文件安装附加组件”。
4. 选择下载的 `.xpi` 文件并确认安装。
5. 打开扩展，填写服务端地址、独立 UUID 和高强度密码。

正式签名版重启 Firefox 后仍会保留，无需再通过 `about:debugging` 临时载入。

## 安全须知

Cookie 是网站登录状态的重要凭据。CookieCloud 为实现同步，需要申请读取网站 Cookie 和访问网站数据的高权限。请按高敏感工具管理：

- 优先使用自己的 CookieCloud 服务端，不建议长期使用公共测试服务器；
- 服务端必须使用 HTTPS，避免通过公网明文传输；
- UUID 和密码均使用独立随机值，密码建议至少 24 位；
- 不要同步网银、支付、主邮箱、密码管理器、域名注册商、Cloudflare、NAS 管理后台等关键账户；
- Local Storage 可能包含长期 Token，不需要时不要开启；
- 建议单独创建一个浏览器配置文件，只登录确有同步需求的网站；
- 定期更换密码，停用时清除服务端数据和本地扩展配置。

扩展在上传前会在浏览器本地加密同步内容，但加密不能消除弱密码、浏览器失陷、恶意服务端或配置泄露带来的风险。详见 [隐私说明](PRIVACY.md)。

## 自建服务端

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
      # 建议更换为随机且不易猜测的路径
      API_ROOT: /cookiecloud-your-random-path
```

启动：

```bash
docker compose up -d
```

扩展中的服务器地址示例：

```text
https://cookie.example.com/cookiecloud-your-random-path
```

生产环境建议在 CookieCloud 前使用可信反向代理或 Cloudflare Tunnel 提供 HTTPS，不要直接将 `8088` 的 HTTP 服务暴露到公网。

### Docker 命令

```bash
docker run -d \
  --name cookiecloud \
  --restart unless-stopped \
  -p 8088:8088 \
  -v "$PWD/data:/data/api/data" \
  -e API_ROOT=/cookiecloud-your-random-path \
  easychen/cookiecloud:latest
```

## 使用方式

CookieCloud 当前以单向同步思路使用：

- 一个浏览器作为上传端；
- 其他客户端或程序作为下载端；
- 避免多个浏览器同时向同一个 UUID 上传；
- Firefox 与 Chromium 必须分开配置 UUID。

上传的数据格式包含 Cookie，以及启用时的 Local Storage。配置本身保存在浏览器本地。

## Firefox 源码构建

```bash
git clone https://github.com/NeoHeee/CookieCloud.git
cd CookieCloud/ext

corepack enable
corepack prepare pnpm@10.28.0 --activate
pnpm install --frozen-lockfile
pnpm compile
pnpm zip:firefox
```

构建结果位于：

```text
ext/dist/*firefox*.zip
```

未签名 ZIP 仅适合开发调试。正式版 Firefox 长期安装应使用 Release 中经过 Mozilla 签名的 `.xpi`。

详细可复现构建信息见 [ext/AMO_BUILD.md](ext/AMO_BUILD.md)。

## API 简表

上传：

```text
POST /update
uuid=<UUID>
encrypted=<ENCRYPTED_PAYLOAD>
```

下载：

```text
GET /get/:uuid
POST /get/:uuid
```

服务端保存的是扩展上传的加密载荷。具体实现和跨语言解密示例请参考上游项目文档。

## 项目关系与许可证

- 上游项目：[easychen/CookieCloud](https://github.com/easychen/CookieCloud)
- Firefox 分支维护：[NeoHeee/CookieCloud](https://github.com/NeoHeee/CookieCloud)
- 隐私说明：[PRIVACY.md](PRIVACY.md)
- 许可证：[GNU General Public License v3.0](LICENSE)

感谢原作者 easychen 及所有贡献者。本仓库的改动继续按照 GPL-3.0 发布。
