import StoreModule from '../module';

class Catalog extends StoreModule {

  initState() {
    return {
      list: [],
      limit: 10,
      count: 0,
      waiting: false
    };
  }

  async load(skip = 0) {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      }
    );
    const response = await fetch(`/api/v1/articles?limit=${this.limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        waiting: false
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
