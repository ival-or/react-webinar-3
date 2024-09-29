import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ControlsLayout({children}) {
  const cn = bem('ControlsLayout');
  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

ControlsLayout.propTypes = {
  children: PropTypes.node
}

export default memo(ControlsLayout);
