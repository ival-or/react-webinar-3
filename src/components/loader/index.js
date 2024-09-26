import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Loader({active, children}) {
  if (active) {
    return <div className="Loader">{children}</div>
  } else {
    return children;
  }
}

Loader.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default memo(Loader);
