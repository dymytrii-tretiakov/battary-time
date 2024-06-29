import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './assets/css/index.css'

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './locales/ru.json';
import en from './locales/en.json';
import ua from './locales/ua.json';
import jp from './locales/jp.json';

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    ua: { translation: ua },
    jp: { translation: jp }
  },
  lng: localStorage.getItem('i18nextLng') || 'ua',
  interpolation: {
    escapeValue: false
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
