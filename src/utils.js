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

export function sortCategories(arr) {
  let newArr = []

  function findParent(arr, elem, depth = 0) {
    let res = false
    for (const item of arr) {
      if (item._id === elem.parent._id) {
        item.children.push({...elem, children: [], depth: depth + 1})
        res = true
        break
      } else {
        if (item.children.length) {
          res = findParent(item.children, elem, depth + 1)
          if (res) {
            break
          }
        }
      }
    }
    return res
  }

  let notFoundChildren = []

  for (const item of arr) {
    if (item.parent) {
      if(!findParent(newArr, item)) {
        notFoundChildren.push(item)
      }
    } else {
      newArr.push({...item, children: [], depth: 0})
    }
  }
  if (notFoundChildren.length) {
    for (const item of notFoundChildren) {
      findParent(newArr, item)
    }
  }
  return newArr
}

export function formCategoriesList(arr) {
  let result = []
  for (const item of arr) {
    result.push(item)
    if (item.children.length) {
      for (const elem of item.children) {
        result.push(elem)
        result = [...result, ...formCategoriesList(elem.children)]
      }
    }
  }
  return result
}
