import {memo, useCallback, useEffect, useState} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";

function Main() {
  const store = useStore();

  const [page, setPage] = useState(() => 1);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    active: state.catalog.waiting,
    limit: state.catalog.limit,
    count: state.catalog.count
  }));

  useEffect(() => {
    store.actions.catalog.load((page - 1) * select.limit);
  }, [page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onPaginate: useCallback(page => setPage(page), []),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <Loader active={select.active}>
        <List list={select.list} renderItem={renders.item} />
        <Pagination limit={select.limit} count={select.count} onChange={callbacks.onPaginate} page={page}/>
      </Loader>
    </PageLayout>
  );
}

export default memo(Main);
