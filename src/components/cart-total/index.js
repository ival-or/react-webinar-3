import React from "react";
import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {formatPrice} from "../../utils";
import './style.css';

function CartTotal({sum}) {
  const cn = bem('CartTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>Итого</span>
      <span className={cn('cell')}> {formatPrice(sum)}</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

CartTotal.propTypes = {
  sum: PropTypes.number
};

CartTotal.defaultProps = {
  sum: 0
}

export default memo(CartTotal);
