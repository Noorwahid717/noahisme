import { useEffect, useState } from 'react';
import { t, getCurrentLanguage, type Language } from '../lib/i18n';

export default function I18nText({ 
  tKey, 
  as = 'span',
  className = '',
  ...props 
}: { 
  tKey: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: any;
}) {
  const [mounted, setMounted] = useState(false);
  
  // Initialize with current language immediately
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'id';
    return getCurrentLanguage();
  });
  
  // Derive text from lang - will auto-update when lang changes
  const text = t(tKey as any, lang);

  // Update language on mount and check periodically
  useEffect(() => {
    setMounted(true);
    
    const updateLanguage = () => {
      const currentLang = getCurrentLanguage();
      setLang(currentLang);
    };
    
    // Update immediately
    updateLanguage();
    
    // Check for changes
    const interval = setInterval(updateLanguage, 300);
    
    return () => clearInterval(interval);
  }, []);

  const Component = as;
  return (
    <Component 
      className={className} 
      {...props}
      data-i18n-key={tKey}
      data-i18n-lang={lang}
      data-i18n-hydrated={mounted ? 'true' : 'false'}
    >
      {text}
    </Component>
  );
}
