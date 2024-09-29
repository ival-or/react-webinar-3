import {memo, useCallback, useEffect, useState} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import Controls from "../../containers/controls";
import {useParams} from "react-router-dom";

function Main() {
  const store = useStore();

  const params = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    active: state.catalog.waiting,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    page: state.catalog.params.page
  }));

  useEffect(() => {
    store.actions.catalog.initParams();
  }, [params]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onPaginate: useCallback(page => store.actions.catalog.setParams({page}), [store]),
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
      <Controls />
      <Loader active={select.active}>
        <List list={select.list} renderItem={renders.item} />
        <Pagination limit={select.limit} count={select.count} onChange={callbacks.onPaginate} page={select.page}/>
      </Loader>
    </PageLayout>
  );
}

export default memo(Main);
