import { useEffect, useState } from "react";
import { t, getCurrentLanguage, type TranslationKey, type Language } from "../lib/i18n";

export function useTranslation() {
  const [lang, setLang] = useState<Language>('id');

  useEffect(() => {
    // Get initial language
    const currentLang = getCurrentLanguage();
    setLang(currentLang);

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLang = getCurrentLanguage();
      setLang(newLang);
    };

    // Check for URL parameter changes
    const interval = setInterval(() => {
      const urlLang = new URLSearchParams(window.location.search).get('lang');
      if ((urlLang === 'id' || urlLang === 'en') && urlLang !== lang) {
        setLang(urlLang);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return {
    t: (key: TranslationKey) => t(key, lang),
    lang,
  };
}
