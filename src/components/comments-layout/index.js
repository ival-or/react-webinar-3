import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Comment from "../comment";
import CommentAnswer from "../../containers/comment-answer";

function CommentsLayout({count, list, onSelectAnsweredComment, onRemoveAnsweredComment, answeredId, user, t, scrollRef}) {

  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <div className={cn('count')}>{t('article.comments')} ({count})</div>
      <div className={cn('list')}>{
        list.map(item =>
          <div key={item._id} className={cn('list-item')} style={{paddingLeft: item.paddingLeft}}>
            {item._id === 'commentForm' ?
              <CommentAnswer
                answeredId={answeredId}
                onRemoveAnsweredComment={onRemoveAnsweredComment}
                scrollRef={scrollRef}/> :
              <Comment
                text={item.text}
                date={item.dateCreate}
                author={item.author}
                _id={item._id}
                onSelectAnsweredComment={onSelectAnsweredComment}
                activeUser={item.author._id === user._id}
                t={t}
              />
            }
          </div>
        )}
      </div>
    </div>
  );
}

CommentsLayout.propTypes = {
  count: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.object,
    date: PropTypes.string,
    text: PropTypes.string,
    _id: PropTypes.string
  })).isRequired,
  user: PropTypes.object,
  answeredId: PropTypes.string,
  onRemoveAnsweredComment: PropTypes.func,
  onSelectAnsweredComment: PropTypes.func,
  onLoadMore: PropTypes.func,
  t: PropTypes.func
};

export default memo(CommentsLayout);
