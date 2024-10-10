import {useEffect, useMemo, useState} from 'react';
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [lang, setLang] = useState(i18n.lang);

  const unsubscribe = useMemo(() => {

    return i18n.subscribe(() => {
      const newLang = i18n.lang;
      setLang(newLang);
    });
  }, []);

  useEffect(() => unsubscribe, [unsubscribe]);

  return useMemo(() => ({
    // Код локали
    lang,
    // Функция для смены локали
    setLang: (value) => i18n.setLang(value),
    // Функция для локализации текстов с замыканием на код языка
    t: (text, number) => i18n.translate(text, number)
  }), [lang]);
}
