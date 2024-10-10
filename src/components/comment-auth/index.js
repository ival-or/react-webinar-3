import {memo} from 'react';
import './style.css';
import PropTypes from "prop-types";

function CommentAuth({answeredId, onRemoveAnsweredComment, onSignIn, t, scrollRef}) {

  const callbacks = {
    onRemoveAnsweredComment: () => onRemoveAnsweredComment(),
    onSignIn: () => onSignIn()
  }

  return (
    <div className='CommentAuth' ref={scrollRef}>
      <div><span className='CommentAuth-login' onClick={callbacks.onSignIn}>{t('comment.auth.login')}</span>, {t('comment.auth.text')} {answeredId ? `${t('comment.auth.answer')}.` : t('comment.auth.comment')}&nbsp;</div>
      {Boolean(answeredId) &&
        <span className='CommentAuth-cancel'
        onClick={callbacks.onRemoveAnsweredComment}>
          {t('comment.cancel')}
        </span>}
    </div>
  );
}

CommentAuth.propTypes = {
  link: PropTypes.string,
  answeredId: PropTypes.string,
  onRemoveAnsweredComment: PropTypes.func,
  t: PropTypes.func
};

CommentAuth.defaultProps = {
  onRemoveAnsweredComment: () => {
  },
  t: (text) => text,
  answeredId: null,
  link: '/login'
}

export default memo(CommentAuth);
