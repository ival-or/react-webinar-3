import React from 'react';
import {memo, useCallback} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import Controls from "../../components/controls";
import CartTool from "../../components/cart-tool";

function Main({store}) {

  const list = store.getState().list;

  const productsSum = store.getState().productsSum
  const cartList = store.getState().cartList
  const amount = cartList.length

  const callbacks = {
    addToCart: useCallback((code, price) => {
      store.addProduct(code, price);
    }, [store]),
    openModalCart: useCallback(() => {
      store.changeModalState()
    },[store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToCart}/>
    }, [callbacks.addToCart]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls>
        <CartTool onOpen={callbacks.openModalCart} amount={amount}
                    sum={productsSum}/>
      </Controls>
      <List list={list} renderItem={renders.item}/>
    </PageLayout>
  );
}

export default memo(Main);
