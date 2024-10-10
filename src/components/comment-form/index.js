import {memo, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function CommentForm({answeredId, onRemoveAnsweredComment, onPost, t, scrollRef}) {

  const cn = bem('CommentForm');

  const [comment, setComment] = useState('')

  const callbacks = {
    onRemoveAnsweredComment: () => onRemoveAnsweredComment(),
    onPost: (e) => {
      e.preventDefault();
      if (comment.trim()) {
        onPost(comment);
        setComment('');
        onRemoveAnsweredComment();
      } else {
        alert('Заполните поле');
      }
    }
  }

  return (
    <form className={cn()} onSubmit={callbacks.onPost} ref={scrollRef}>
      <div className={cn('title')}>{t('comment.form.new')} {answeredId ? t('comment.form.answer') : t('comment.form.comment')}</div>
      <textarea onChange={e => setComment(e.target.value)} value={comment} className={cn('textarea')}/>
      <div className={cn('buttons')}>
        <button type='submit'>{t('comment.form.send')}</button>
        {Boolean(answeredId) &&
          <button onClick={callbacks.onRemoveAnsweredComment}>
            {t('comment.form.cancel')}
          </button>}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onPost: PropTypes.func,
  answeredId: PropTypes.string,
  onRemoveAnsweredComment: PropTypes.func,
  t: PropTypes.func
};

CommentForm.defaultProps = {
  onRemoveAnsweredComment: () => {
  },
  onPost: () => {
  },
  t: (text) => text,
  answeredId: null
}

export default memo(CommentForm);
