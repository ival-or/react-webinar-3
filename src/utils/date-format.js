export default function dateFormat(str, locale = 'ru-RU', options = {}) {
  const date = new Date(str);
  return date.toLocaleString(locale, options)
}
