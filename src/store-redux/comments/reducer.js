// Начальное состояние
export const initialState = {
  comments: [],
  count: 0,
  waiting: false,
  id: ''
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments-list/load-start":
      return {...state, comments: [], waiting: true};

    case "comments-list/load-success":
      return {
        ...state,
        comments: action.payload.data.items,
        count: action.payload.data.count,
        waiting: false,
        id: action.payload.id
      };

    case "comments-list/load-error":
      return {...state, comments: [], count: 0, waiting: false}; //@todo текст ошибки сохранять?

    case "comments-list/post-success":
      return {...state, comments: [...state.comments, action.payload.data], count: state.count + 1}

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
