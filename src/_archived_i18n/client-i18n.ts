// Client-side translation script that runs on every page
import { t, getCurrentLanguage, type TranslationKey } from './i18n';

// Wait for DOM to be ready
if (typeof window !== 'undefined') {
  const applyTranslations = () => {
    const lang = getCurrentLanguage();
    
    // Find all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n') as TranslationKey;
      if (key) {
        element.textContent = t(key, lang);
      }
    });
  };

  // Apply on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTranslations);
  } else {
    applyTranslations();
  }
}
