import {memo, useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Loader from "../../components/loader";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductCard from "../../components/product-card";
import Controls from "../../containers/controls";

function Product() {
  const store = useStore();

  const params = useParams();

  useEffect(() => {
    store.actions.product.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    product: state.product.data,
    waiting: state.product.waiting
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <Controls />
      <Loader active={select.waiting}>
        <ProductCard product={select.product} onAdd={callbacks.addToBasket}/>
      </Loader>
    </PageLayout>
  );
}

export default memo(Product);
