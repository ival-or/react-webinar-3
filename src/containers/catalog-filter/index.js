import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import {listToTree, treeToList} from "../../utils";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.list
  }));
  const {t, lang} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),

    onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store])
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: t('sort.order') },
        { value: 'title.ru', title: t('sort.name') },
        { value: '-price', title: t('sort.-price') },
        { value: 'edition', title: t('sort.time') },
      ],
      [lang],
    ),
    categories: useMemo(() => ([
      {value: '', title: t('filter.category.all')},
      ...treeToList(listToTree(select.categories), (item, depth) => (
        {value: item._id, title: '- '.repeat(depth) + item.title}
      ))
    ]), [select.categories, lang]),
  };

  return (
    <SideLayout padding="medium">
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t('filter.query.placeholder')}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
