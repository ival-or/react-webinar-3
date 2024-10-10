import {memo, useCallback} from 'react';
import useSelector from '../../hooks/use-selector';
import CommentAuth from "../../components/comment-auth";
import CommentForm from "../../components/comment-form";
import commentsActions from "../../store-redux/comments/actions";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import useTranslate from "../../hooks/use-translate";

function CommentAnswer({answeredId, onRemoveAnsweredComment, scrollRef}) {

  const {t} = useTranslate();

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }));
  const params = useParams();
  const parent = {
    _id: answeredId || params.id,
    _type: answeredId ? "comment" : "article"
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const callbacks = {
    postComment: useCallback(text => dispatch(commentsActions.post({
      text: text,
      parent: parent
    })), [parent]),
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname])
  }

  if (!select.exists || select.waiting) {
    return <CommentAuth
      onSignIn={callbacks.onSignIn}
      answeredId={answeredId}
      onRemoveAnsweredComment={onRemoveAnsweredComment}
      t={t}
      scrollRef={scrollRef}
    />
  } else {
    return <CommentForm
      answeredId={answeredId}
      onRemoveAnsweredComment={onRemoveAnsweredComment}
      onPost={callbacks.postComment}
      t={t}
      scrollRef={scrollRef}
    />;
  }
}

CommentAnswer.propTypes = {
  answeredId: PropTypes.string,
  onRemoveAnsweredComment: PropTypes.func
};

CommentAnswer.defaultProps = {
  onRemoveAnsweredComment: () => {
  }
}

export default memo(CommentAnswer);
