import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name],
  );

  // Обработчик изменений в поле
  const onChange = event => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <div className={cn({ theme: props.theme })}>
      <label className={cn('field')}>
        {props.label}
        <input
          className={cn('input')}
          value={value}
          type={props.type}
          placeholder={props.placeholder}
          onChange={onChange}
        />
      </label>
      {props.error && <div className={cn('error')}>{props.error}</div>}
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
};

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: '',
};

export default memo(Input);
