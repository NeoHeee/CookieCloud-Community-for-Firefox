import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const expectedName = 'CookieCloud Community for Firefox';
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const extRoot = path.resolve(scriptDir, '..');
const repoRoot = path.resolve(extRoot, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(extRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const locale of ['zh_CN', 'en']) {
  const localePath = `public/_locales/${locale}/messages.json`;
  const messages = JSON.parse(read(localePath));
  assert(messages.appTitle?.message === expectedName, `${localePath}: appTitle is not the community name.`);
  assert(messages.appDesc?.message?.includes(expectedName), `${localePath}: appDesc does not identify the community edition.`);
  assert(messages.openSettingsTitle?.message?.includes(expectedName), `${localePath}: toolbar title is not branded consistently.`);
}

const optionsHtml = read('entrypoints/options/index.html');
assert(optionsHtml.includes(`<title>${expectedName}</title>`), 'Options page title is not branded consistently.');

const settingsApp = read('entrypoints/popup/App.tsx');
assert(settingsApp.includes("browser.i18n.getMessage('appTitle')"), 'Settings heading must use the localized appTitle.');
assert(!settingsApp.includes('>CookieCloud</h2>'), 'Legacy hard-coded settings heading is still present.');

const wxtConfig = read('wxt.config.ts');
assert(wxtConfig.includes("default_title: '__MSG_openSettingsTitle__'"), 'Toolbar title must use the localized openSettingsTitle message.');

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const privacy = fs.readFileSync(path.join(repoRoot, 'PRIVACY.md'), 'utf8');
assert(readme.includes(expectedName), 'README is missing the community name.');
assert(privacy.startsWith(`# ${expectedName} 隐私声明`), 'Privacy notice title is not branded consistently.');

console.log(`Brand verification passed: ${expectedName}`);
