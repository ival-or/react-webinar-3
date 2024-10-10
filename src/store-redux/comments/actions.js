export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {

      dispatch({type: 'comments-list/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        dispatch({type: 'comments-list/load-success', payload: {data: res.data.result, id: id}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments-list/load-error'});
      }
    }
  },

  post: (data) => {
    return async (dispatch, getState, services) => {
      const stringifiedData = JSON.stringify(data)
      try {
        const res = await services.api.request({
          url: '/api/v1/comments?fields=text,isDeleted,dateCreate,author(profile(name)),parent(_type)',
          method: 'POST',
          body: stringifiedData,
        });
        dispatch({type: 'comments-list/post-success', payload: {data: res.data.result}});
      } catch (e) {
        //Ошибка отправки
        dispatch({type: 'comments-list/load-error'});
      }
    }
  },
}
