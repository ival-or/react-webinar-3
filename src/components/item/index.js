import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {formatPrice} from "../../utils";
import {cn as bem} from "@bem-react/classname";

function Item(props) {

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item.code, props.item.price)
  }

  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatPrice(props.item.price)}</div>
      <div className={cn('add')}>
        <button onClick={callbacks.onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default React.memo(Item);
