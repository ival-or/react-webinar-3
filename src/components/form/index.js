import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Form({ children, title, onSubmit}) {
  const cn = bem('Form');
  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2 className={cn('title')}>{title}</h2>
      <div>
        {React.Children.map(children, child => (
          <div className={cn('field')}>
            {child}
          </div>
        ))}
      </div>
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onSubmit: PropTypes.func
};


export default memo(Form);
