import React from 'react';
import {memo, useCallback} from 'react';
import ItemCart from "../../components/item-cart";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import CartTotal from "../../components/cart-total";

function Cart({store}) {

  const productsSum = store.getState().productsSum
  const cartList = store.getState().cartList

  const callbacks = {
    removeFromCart: useCallback((code) => {
      store.deleteProduct(code);
    }, [store]),
    closeModal: useCallback(() => {
      store.changeModalState()
    },[store]),
  }

  const renders = {
    itemCart: useCallback((item) => {
      return <ItemCart item={item} onDeleteProduct={callbacks.removeFromCart}/>
    }, [callbacks.removeFromCart]),
  };

  return (
    <ModalLayout title='Корзина' onClose={callbacks.closeModal}>
      <List list={cartList} renderItem={renders.itemCart}/>
      <CartTotal sum={productsSum}/>
    </ModalLayout>
  );
}

export default Cart;
