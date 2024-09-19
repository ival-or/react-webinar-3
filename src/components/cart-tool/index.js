import React from 'react';
import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {formatPrice, plural} from "../../utils";
import './style.css';

function CartTool({sum, amount, onOpen}) {
  const cn = bem('CartTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${formatPrice(sum)}`
          : `пусто`
        }
      </span>
      <button onClick={onOpen}>Перейти</button>
    </div>
  )
}

CartTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

CartTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(CartTool);
