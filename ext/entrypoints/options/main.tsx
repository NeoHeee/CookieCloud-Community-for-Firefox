import React from 'react';
import { createRoot } from 'react-dom/client';
import CookieCloudPopup from '../popup/App';
import '../popup/style.css';

document.documentElement.classList.add('options-page');
document.body.classList.add('options-page');

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<CookieCloudPopup />);
}
