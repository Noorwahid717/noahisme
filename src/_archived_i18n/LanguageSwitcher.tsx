import { useEffect, useState } from "react";
import { getCurrentLanguage, setLanguage, type Language } from "../lib/i18n";

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>('id');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLang(getCurrentLanguage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCurrentLang(lang);
    setIsOpen(false);
    
    // Navigate to same page with lang parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.location.href = url.toString();
  };

  return (
    <div className="language-switcher">
      <button
        className="lang-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.62,87.62,0,0,1-6.4,32.94l-44.7-27.49a15.92,15.92,0,0,0-6.24-2.23l-22.82-3.08a16,16,0,0,1-11.87-9.25l-3.69-8.8a16,16,0,0,1,1.9-16.64l4.59-5.52a15.94,15.94,0,0,0,3.89-10.18V68.62l-10-4.47a16,16,0,0,1-9.3-13.7V40a88,88,0,0,1,103.66,88Zm-176,0a87.59,87.59,0,0,1,14.67-48.55L68.1,91.69a16,16,0,0,0,8.9,8.41l9.39,3.48a15.93,15.93,0,0,1,10.26,10.71l3.63,11.37a16,16,0,0,0,15.15,11.16h8.46a16,16,0,0,1,13.05,6.7l7.12,10a16,16,0,0,0,12.76,6.48h1.61a16,16,0,0,1,13,6.64l12.81,17.73A88.6,88.6,0,0,1,128,216,88.1,88.1,0,0,1,40,128Z" />
        </svg>
        <span className="lang-code">{currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          <button
            className={`lang-option ${currentLang === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
            type="button"
          >
            <span className="lang-flag">🇬🇧</span>
            <span>English</span>
          </button>
          <button
            className={`lang-option ${currentLang === 'id' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('id')}
            type="button"
          >
            <span className="lang-flag">🇮🇩</span>
            <span>Indonesia</span>
          </button>
        </div>
      )}
    </div>
  );
}
