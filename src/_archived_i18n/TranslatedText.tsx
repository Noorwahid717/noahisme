import { useEffect, useState } from "react";
import { t, getCurrentLanguage, type TranslationKey, type Language } from "../lib/i18n";

interface Props {
  tKey: TranslationKey;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export default function TranslatedText({ tKey, as: Component = 'span', className }: Props) {
  const [text, setText] = useState<string>('');
  const [lang, setLang] = useState<Language>('id');

  useEffect(() => {
    const currentLang = getCurrentLanguage();
    setLang(currentLang);
    setText(t(tKey, currentLang));
  }, [tKey]);

  return <Component className={className}>{text}</Component>;
}
