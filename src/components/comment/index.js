import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";

function Comment(props) {

  const cn = bem('Comment');

  const callbacks = {
    onSelectAnsweredComment: () => props.onSelectAnsweredComment(props._id),
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <div className={cn('author', {active: props.activeUser})}>{props.author.profile.name}</div>
        <div className={cn('date')}>{props.date}</div>
      </div>
      <div className={cn('text')}>{props.text}</div>
      <span className={cn('answer')} onClick={callbacks.onSelectAnsweredComment}>{props.t('comment.answer')}</span>
    </div>
  );
}

Comment.propTypes = {
  author: PropTypes.object,
  date: PropTypes.string,
  text: PropTypes.string,
  _id: PropTypes.string,
  activeUser: PropTypes.bool,
  onSelectAnsweredComment: PropTypes.func,
  t: PropTypes.func
};

Comment.defaultProps = {
  onSelectAnsweredComment: () => {
  },
  t: (text) => text,
  activeUser: false,
}

export default memo(Comment);
