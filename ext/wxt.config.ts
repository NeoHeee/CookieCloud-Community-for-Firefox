import { defineConfig } from 'wxt';

const extensionIcons = {
  16: 'icon/icon-small.svg',
  32: 'icon/icon-small.svg',
  48: 'icon/icon.svg',
  96: 'icon/icon.svg',
  128: 'icon/icon.svg'
};

export default defineConfig({
  outDir: 'dist',
  modules: ['@wxt-dev/webextension-polyfill'],
  manifest: {
    name: '__MSG_appTitle__',
    description: '__MSG_appDesc__',
    default_locale: 'zh_CN',
    icons: extensionIcons,
    browser_action: {
      default_icon: extensionIcons,
      default_title: 'CookieCloud',
      default_popup: 'popup.html'
    },
    options_ui: {
      page: 'options.html',
      open_in_tab: true
    },
    permissions: [
      'cookies',
      'tabs',
      'storage',
      'alarms',
      'unlimitedStorage'
    ],
    host_permissions: ['<all_urls>'],
    // Mozilla supports data_collection_permissions, while the currently
    // pinned WXT manifest types have not added the field yet.
    browser_specific_settings: {
      gecko: {
        id: 'cookiecloud-firefox@neoheee.github.io',
        data_collection_permissions: {
          required: ['websiteContent', 'browsingActivity']
        }
      },
      gecko_android: {
        strict_min_version: '120.0'
      }
    }
  } as any,
  vite: () => ({
    css: {
      postcss: './postcss.config.js'
    }
  })
});
