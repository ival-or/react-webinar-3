import StoreModule from '../module';

class Catalog extends StoreModule {

  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
      },
      count: 0,
      waiting: false,
    }
  }

  async initParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let params = {};
    if (urlParams.has('page')) params.page = Number(urlParams.get('page'));
    if (urlParams.has('limit')) params.limit = Number(urlParams.get('limit'));
    await this.setParams({...this.initState().params, ...params}, true);
  }

  async setParams(newParams = {}, replaceHistoryState = false) {
    const params = {...this.getState().params, ...newParams};

    this.setState({
      ...this.getState(),
      params,
      waiting: true
    }, 'Установлены параметры каталога');

    let urlSearchParams = new URLSearchParams(params).toString();
    const url = 'http://' + window.location.host + '/?' + urlSearchParams;
    if (replaceHistoryState) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const fetchParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count'
    }

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(fetchParams)}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }
}

export default Catalog;
