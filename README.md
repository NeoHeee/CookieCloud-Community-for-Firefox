<div align="center">
  <img src="ext/public/icon/icon.svg" width="128" alt="CookieCloud Community for Firefox">
  <h1>CookieCloud Community for Firefox</h1>
  <p><strong>Firefox Desktop 与 Firefox Android 专用的 CookieCloud 社区版扩展</strong></p>
  <p>同步 Cookie，并可选同步匹配域名的 Local Storage；数据在浏览器本地加密后发送到用户配置的 CookieCloud 服务端。</p>

  <p>
    <a href="PRIVACY.md">隐私说明</a> ·
    <a href="https://github.com/easychen/CookieCloud">上游项目与服务端</a> ·
    <a href="https://github.com/NeoHeee/CookieCloud-Community-for-Firefox/issues">问题反馈</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Firefox-1.0.7-FF7139?logo=firefox-browser&logoColor=white" alt="Firefox 1.0.7">
    <img src="https://img.shields.io/badge/Desktop-supported-success" alt="Firefox Desktop supported">
    <img src="https://img.shields.io/badge/Android-Firefox%20120%2B-success" alt="Firefox Android 120+">
    <img src="https://img.shields.io/badge/license-GPL--3.0-blue" alt="GPL-3.0">
  </p>
</div>

---

## 仓库范围

本仓库**只保留 Firefox 浏览器扩展**及其构建、测试、AMO 审核所需文件，不包含：

- CookieCloud 服务端源码或 Docker 部署文件；
- Chrome、Edge 或其他 Chromium 浏览器的构建与发布流程；
- 上游示例、SDK、截图和无关文件。

服务端部署及其他浏览器版本请查看 [easychen/CookieCloud](https://github.com/easychen/CookieCloud)。

## 扩展商店
- Firefox 浏览器扩展商店 [CookieCloud Community for Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/cookiecloud-community)。

## 当前版本

### Firefox v1.0.7

- 将扩展管理页、设置页、浏览器标签和工具栏提示统一为 `CookieCloud Community for Firefox`；
- 更新中文与英文扩展简介，明确这是 Firefox 社区适配版；
- 设置页标题改用本地化扩展名称，并优化长标题在窄屏上的换行显示；
- 保留 `CookieCloud` 服务端、固定扩展 ID、存储键及同步协议名称，避免破坏兼容性；
- 新增品牌一致性自动检查，防止后续构建重新出现旧显示名称；
- 继续支持 Firefox Desktop 与 Firefox Android 120+。

## 浏览器支持

| 浏览器 | 状态 | 说明 |
|---|---|---|
| Firefox Desktop | ✅ 支持 | 点击工具栏图标直接打开完整设置页 |
| Firefox Android 120+ | ✅ 支持 | 使用同一全屏设置页，适配移动端安全区 |
| Chrome / Edge | ❌ 不包含 | 请使用上游项目提供的官方版本 |

Firefox 与 Chromium 的 Cookie 数据结构存在差异，**不要让 Firefox 与 Chrome/Edge 使用同一个上传 UUID**，避免相互覆盖。

## 安全须知

Cookie 是网站登录状态的重要凭据。CookieCloud 为实现同步，需要申请读取网站 Cookie 和访问网站数据的高权限。请按高敏感工具管理：

- 优先使用自己的 CookieCloud 服务端，不建议长期使用公共测试服务器；
- 服务端必须使用 HTTPS，避免公网明文传输；
- UUID 和密码均使用独立随机值，密码建议至少 24 位；
- 不要同步网银、支付、主邮箱、密码管理器、域名注册商、Cloudflare、NAS 管理后台等关键账户；
- Local Storage 可能包含长期 Token，不需要时不要开启；
- Firefox、Chrome 和 Edge 分别使用不同 UUID；
- 定期更换密码，停用时清除服务端数据和本地扩展配置。

扩展在上传前会在浏览器本地加密同步内容，但加密不能消除弱密码、浏览器失陷、恶意服务端或配置泄露带来的风险。详见 [隐私说明](PRIVACY.md)。

## 项目关系与许可证

- 上游项目及服务端：[easychen/CookieCloud](https://github.com/easychen/CookieCloud)
- Firefox 社区版：[NeoHeee/CookieCloud-Community-for-Firefox](https://github.com/NeoHeee/CookieCloud-Community-for-Firefox)
- 问题反馈：[GitHub Issues](https://github.com/NeoHeee/CookieCloud-Community-for-Firefox/issues)
- 隐私说明：[PRIVACY.md](PRIVACY.md)
- 许可证：[GNU General Public License v3.0](LICENSE)

感谢原作者 easychen 及所有贡献者。本仓库的改动继续按照 GPL-3.0 发布。
