import { useEffect, useState } from 'react';
import { getCurrentLanguage, type Language } from '~/lib/i18n';

export default function LanguageDebug() {
  const [lang, setLang] = useState<Language>('id');
  const [urlParam, setUrlParam] = useState<string>('');
  const [localStorageValue, setLocalStorageValue] = useState<string>('');

  useEffect(() => {
    // Get current language
    const currentLang = getCurrentLanguage();
    setLang(currentLang);
    
    // Get URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    setUrlParam(urlParams.get('lang') || 'none');
    
    // Get localStorage
    setLocalStorageValue(localStorage.getItem('language') || 'none');
    
    console.log('=== LANGUAGE DEBUG ===');
    console.log('Current Language:', currentLang);
    console.log('URL Parameter:', urlParams.get('lang'));
    console.log('localStorage:', localStorage.getItem('language'));
    console.log('=====================');
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace',
      maxWidth: '250px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>
        🐛 Language Debug
      </h3>
      <div style={{ lineHeight: '1.6' }}>
        <div><strong>Current Lang:</strong> {lang}</div>
        <div><strong>URL Param:</strong> {urlParam}</div>
        <div><strong>localStorage:</strong> {localStorageValue}</div>
        <div><strong>Full URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'SSR'}</div>
      </div>
    </div>
  );
}
