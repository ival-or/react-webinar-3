import * as translations from "./translations";

class I18NService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.lang = 'ru';
    this.listeners = [];
  }

  translate(text, plural) {
    const lang = this.lang
    let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;
    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    this.services.api.setHeader('X-Lang', lang);

    return result;
  }

  setLang(newLang) {
    this.lang = newLang
    for (const listener of this.listeners) listener(this.lang);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
}

export default I18NService;
