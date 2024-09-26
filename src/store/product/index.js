import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class ProductState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false
    }
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    this.setState({
      data: {},
      waiting: true
    });

    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
      data: json.result,
      waiting: false
    }, 'Загружен товар из АПИ');
  }
}

export default ProductState;
