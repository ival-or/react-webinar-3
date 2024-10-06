/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function listToTree(list, key = '_id') {
  let nodes = {};
  let roots = {};
  for (const item of list) {

    if (!nodes[item[key]]) {
      nodes[item[key]] = item;
      nodes[item[key]].children = [];

      roots[item[key]] = nodes[item[key]];
    } else {
      nodes[item[key]] = Object.assign(nodes[item[key]], item);
    }

    if (item.parent?._id) {
      if (!nodes[item.parent._id]) nodes[item.parent[key]] = {children: []};
      nodes[item.parent[key]].children.push(nodes[item[key]]);
      if (roots[item[key]]) delete roots[item[key]];
    }
  }
  return Object.values(roots);
}

export function treeToList(tree, callback, depth = 0, result = []) {
  for (const item of tree) {
    result.push(callback ? callback(item, depth) : item);
    if (item.children?.length) treeToList(item.children, callback, depth + 1, result);
  }
  return result;
}
