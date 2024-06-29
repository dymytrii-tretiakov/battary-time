import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  };

  return (
      <select
        name="language"
        id="language"
        className='language-selector'
        onChange={e => changeLanguage(e.target.value)}
        value={localStorage.getItem('i18nextLng') || 'ua'}
      >
        {Object.keys(i18n.store.data).map(lang => (
          <option key={lang} value={lang}>{t(lang)}</option>
        ))}
      </select>
  );
};

export default LanguageSelector;
