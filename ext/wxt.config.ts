import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  outDir: 'dist',
  modules: ['@wxt-dev/webextension-polyfill'],
  manifest: ({ browser }) => ({
    name: '__MSG_appTitle__',
    description: '__MSG_appDesc__',
    default_locale: 'zh_CN',
    permissions: [
      'cookies',
      'tabs',
      'storage',
      'alarms',
      'unlimitedStorage'
    ],
    host_permissions: [
      '<all_urls>'
    ],
    browser_specific_settings: browser === 'firefox'
      ? {
          gecko: {
            id: 'cookiecloud-firefox@neoheee.github.io',
            data_collection_permissions: {
              required: [
                'websiteContent',
                'browsingActivity'
              ]
            }
          },
          gecko_android: {
            strict_min_version: '120.0'
          }
        }
      : undefined
  }),
  vite: () => ({
    css: {
      postcss: './postcss.config.js'
    }
  })
});
