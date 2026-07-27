import { upload_cookie, download_cookie, load_data, save_data, sleep } from '../utils/functions';
import browser from 'webextension-polyfill';

export default defineBackground(() => {
  console.log('CookieCloud Community for Firefox background started', { id: browser.runtime.id });

  // Do not use a toolbar popup. Firefox displayed the React popup as an empty,
  // collapsed panel on some desktop and Android builds. Opening the standard
  // options page is more reliable and gives both platforms the same UI.
  browser.browserAction.onClicked.addListener(async () => {
    try {
      await browser.runtime.openOptionsPage();
    } catch (error) {
      console.error('Failed to open CookieCloud Community for Firefox settings:', error);
    }
  });

  browser.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
      browser.alarms.create('bg_1_minute', {
        when: Date.now(),
        periodInMinutes: 1
      });
    }
    else if (details.reason == "update") {
      browser.alarms.create('bg_1_minute', {
        when: Date.now(),
        periodInMinutes: 1
      });
    }
  });

  browser.alarms.onAlarm.addListener(async a => {
    if (a.name == 'bg_1_minute') {
      const config = await load_data("COOKIE_SYNC_SETTING");
      if (config) {
        if (config.type && config.type == 'pause') {
          console.log("Pause mode, no sync");
          return true;
        }

        const now = new Date();
        const minute = now.getMinutes();
        const hour = now.getHours();
        const day = now.getDate();
        const minute_count = (day * 24 + hour) * 60 + minute;

        if (config.uuid) {
          if (parseInt(config.interval) < 1 || minute_count % config.interval == 0) {
            console.log(`Execute sync ${minute_count} ${config.interval}`);
            if (config.type && config.type == 'down') {
              const result = await download_cookie(config);
              if (result && result['action'] == 'done')
                console.log("Download success");
              else
                console.log(result);
            } else {
              const result = await upload_cookie(config);
              if (result && result['action'] == 'done')
                console.log("Upload success");
              else
                console.log(result);
            }
          }
        }

        if (config.keep_live) {
          const keep_live = config.keep_live?.trim()?.split("\n");
          for (let i = 0; i < keep_live.length; i++) {
            const line = keep_live[i];
            if (line.trim().startsWith("#")) continue;
            const parts = line.split("|");
            const url = parts[0];
            const interval = parts[1] ? parseInt(parts[1]) : 60;
            if (interval > 0 && minute_count % interval == 0) {
              console.log(`keep live ${url} ${minute_count} ${interval}`);

              const [exists_tab] = await browser.tabs.query({"url": `${url.trim().replace(/\/+$/, '')}/*`});
              if (exists_tab && exists_tab.id) {
                console.log(`tab exists ${exists_tab.id}`, exists_tab);
                if (!exists_tab.active) {
                  console.log(`Background status, refresh page`);
                  await browser.tabs.reload(exists_tab.id);
                } else {
                  console.log(`Foreground status, skip`);
                }
                return true;
              } else {
                console.log(`tab not exists, open in background`);
              }

              const tab = await browser.tabs.create({"url": url, "active": false, "pinned": true});
              await sleep(5000);
              if (tab.id) {
                await browser.tabs.remove(tab.id);
              }
            }
          }
        }
      }
    }
  });
});
