import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Pagination(props) {

  const length = Math.ceil(props.count / Math.max(props.limit, 1));

  let left = Math.max(props.page - 1, 1);
  let right = Math.min(left + 2, length);

  left = Math.max(right - 2, 1);

  let items = [];
  if (left > 1) items.push(1);
  if (left > 2) items.push(null);
  for (let page = left; page <= right; page++) items.push(page);
  if (right < length - 1) items.push(null);
  if (right < length) items.push(length);

  const onClick = (number) => (e) => {
    if (props.onChange) {
      e.preventDefault();
      props.onChange(number);
    }
  }

  const cn = bem('Pagination');
  return (
    <ul className={cn()}>
      {items.map((number, index) => (
        <li key={index}
            className={cn('item', {active: number === props.page, split: !number})}
            onClick={onClick(number)}>
          {number || '...'}
        </li>
      ))}
    </ul>
  )
}

Pagination.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number,
  onChange: PropTypes.func,
}

export default memo(Pagination);
