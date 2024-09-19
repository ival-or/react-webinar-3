import {formatPrice} from "../../utils";
import PropTypes from "prop-types";
import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemCart(props) {
  const callbacks = {
    onDeleteProduct: (e) => {
      e.stopPropagation();
      props.onDeleteProduct(props.item.code, props.item.price)
    }
  }
  const cn = bem('ItemCart');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatPrice(props.item.price)}</div>
      <div className={cn('amount')}>{props.item.amount}&nbsp;шт</div>
      <div className={cn('delete')}>
        <button onClick={callbacks.onDeleteProduct}>
          Удалить
        </button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
    itemSum: PropTypes.number
  }).isRequired,
  onDeleteProduct: PropTypes.func
};

export default React.memo(ItemCart);
