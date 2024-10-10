import {memo, useMemo, useCallback, useState, useRef} from 'react';
import {useSelector as useSelectorRedux} from 'react-redux';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import shallowequal from "shallowequal";
import dateFormat from "../../utils/date-format";
import CommentsLayout from "../../components/comments-layout";
import useSelector from "../../hooks/use-selector";

function Comments() {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }
  const {t, lang} = useTranslate();

  const scrollRef = useRef(null);
  const executeScroll = () => scrollRef.current.scrollIntoView({behavior: "smooth", block: "center"})

  const select = useSelector(state => ({
    user: state.session.user
  }));

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.comments,
    count: state.comments.count,
    waiting: state.comments.waiting
  }), shallowequal);

  const [answeredId, setAnsweredId] = useState('');

  const callbacks = {
    selectAnsweredComment: useCallback(async id => {
      await setAnsweredId(id)
      executeScroll()
    }, []),
    removeAnsweredComment: useCallback(async () => {
      await setAnsweredId('')
      executeScroll()
    }, [])
  }

  const commentsList = useMemo(() => {
    let comments = selectRedux.comments;

    if (answeredId) {
      comments = [...comments, {
        parent: {
          _id: answeredId,
          _type: "comment"
        },
        _id: 'commentForm'
      }]
    }
    let result = treeToList(listToTree(comments), (item, level) => {
        const paddingLeft = level < 6 ? level * 30 : 5 * 30
        return {text: item.text, dateCreate: dateFormat(item.dateCreate, lang, dateOptions), author: item.author, paddingLeft: paddingLeft, _id: item._id}
    })

    if (!answeredId) result.push({_id: 'commentForm'})

    return result
  }, [selectRedux.comments, lang, answeredId])

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsLayout
        count={selectRedux.count}
        list={commentsList}
        answeredId={answeredId}
        onSelectAnsweredComment={callbacks.selectAnsweredComment}
        onRemoveAnsweredComment={callbacks.removeAnsweredComment}
        user={select.user}
        t={t}
        scrollRef={scrollRef}
      />
    </Spinner>
  );
}

export default memo(Comments);
