
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addProduct(code, price) {
    const listItem = this.state.list.find(item => item.code === code)

    let newCartList = this.state.cartList

    const cartListItem = newCartList.find(item => item.code === code)

    if (cartListItem) {
      this.setState({
        ...this.state,
        cartList: this.state.cartList.map(item => {
          if (item.code === code) {
            return {
              ...item,
              amount: item.amount + 1,
              itemSum: item.itemSum + price,
            };
          }
          return item;
        }),
        productsSum: this.state.productsSum + price
      })
    } else {
      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, {...listItem, amount: 1, itemSum: price}],
        productsSum: this.state.productsSum + price
      })
    }
  };

  deleteProduct(code) {
    const itemSum = this.state.cartList.find(item => item.code === code).itemSum

    this.setState({
      ...this.state,
      cartList: this.state.cartList.filter(item => item.code !== code),
      productsSum: this.state.productsSum - itemSum
    })
  };

  changeModalState() {
    this.setState({
      ...this.state,
      modalState: !this.state.modalState
    })
  }
}

export default Store;
