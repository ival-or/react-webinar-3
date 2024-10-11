import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function CatalogFilter() {
  const store = useStore();
  const { t, lang } = useTranslate();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.list,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Фильтр по категории
    onCategory: useCallback(
      category =>
        store.actions.catalog.setParams({
          category,
          page: 1,
        }),
      [store],
    ),
  };

  const options = {
    // Варианты сортировок
    sort: useMemo(
      () => [
        { value: 'order', title: t('sort.order') },
        { value: 'title.ru', title: t('sort.title') },
        { value: '-price', title: t('sort.-price') },
        { value: 'edition', title: t('sort.edition') },
      ],
      [lang],
    ),

    // Категории для фильтра
    categories: useMemo(
      () => [
        { value: '', title: t('filter.allCategories') },
        ...treeToList(listToTree(select.categories), (item, level) => ({
          value: item._id,
          title: '- '.repeat(level) + item.title,
        })),
      ],
      [select.categories],
    ),
  };

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        delay={1000}
        theme={'big'}
        placeholder={t('filter.search')}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
