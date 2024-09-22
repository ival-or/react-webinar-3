import React from "react";
import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function List({list=[], renderItem = (item) => {}}) {

  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          {renderItem(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  renderItem: PropTypes.func,
};

export default memo(List);
