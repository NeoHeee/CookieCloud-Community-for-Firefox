import React from 'react';
import { createRoot } from 'react-dom/client';
import browser from 'webextension-polyfill';
import CookieCloudPopup from '../popup/App';
import '../popup/style.css';

document.documentElement.classList.add('options-page');
document.body.classList.add('options-page');

const appTitle = browser.i18n.getMessage('appTitle') || 'CookieCloud Community for Firefox';
document.title = appTitle;

const container = document.getElementById('app');
if (container) {
  const syncCommunityHeading = () => {
    const heading = container.querySelector('h2');
    if (heading && heading.textContent !== appTitle) {
      heading.textContent = appTitle;
    }
  };

  const observer = new MutationObserver(syncCommunityHeading);
  observer.observe(container, { childList: true, subtree: true, characterData: true });

  const root = createRoot(container);
  root.render(<CookieCloudPopup />);
  requestAnimationFrame(syncCommunityHeading);
}
