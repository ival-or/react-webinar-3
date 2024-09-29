import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';
import PropTypes from "prop-types";

function HomeButton() {
  const cn = bem('HomeButton');

  return (
    <Link className={cn()} to="/" >Главная</Link>
  )
}


HomeButton.propTypes = {
  onClick: PropTypes.func
}

export default memo(HomeButton);
