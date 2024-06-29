import '../assets/css/App.css';
import Calculator from './Calculator';
import Settings from './Settings';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from '../locales/ru.json';
import en from '../locales/en.json';
import ua from '../locales/ua.json';

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    ua: { translation: ua }
  },
  lng: localStorage.getItem('i18nextLng') || 'ua',
  interpolation: {
    escapeValue: false
  }
});

function App() {
  return (
    <>
      <Calculator />
      <Settings />
    </>
  );
}

export default App;
