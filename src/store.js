import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = { list: [], cart: [], totalCount: 0, totalPrice: 0 }) {
    this.state = initState;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   */
  addToCart(itemCode) {
    if (!Array.isArray(this.state.list) || !Array.isArray(this.state.cart)) {
      console.error("list или cart не является массивом.");
      return;
    }

    const item = this.state.list.find(i => i.code === itemCode);
    if (!item) {
      console.error(`Товар с кодом ${itemCode} не найден.`);
      return;
    }

    let newCart = [...this.state.cart];
    const existingItem = newCart.find(i => i.code === itemCode);

    if (existingItem) {
      existingItem.count += 1;
    } else {
      newCart.push({ ...item, count: 1 });
    }

    this.recalculateCart(newCart);
  }

  /**
   * Удаление товара из корзины
   */
  onRemoveCart(code) {
    const newCart = this.state.cart.filter(item => item.code !== code);
    this.recalculateCart(newCart);
  }

  /**
   * Пересчет суммы и количества товаров
   */
  recalculateCart(newCart) {
    const totalCount = newCart.reduce((total, item) => total + item.count, 0);
    const totalPrice = newCart.reduce((total, item) => total + item.price * item.count, 0);

    this.setState({
      ...this.state,
      cart: newCart,
      totalCount,
      totalPrice,
    });
  }

  getTotalCount() {
    return this.state.totalCount;
  }

  getTotalPrice() {
    return this.state.totalPrice;
  }

  getUniqueCount() {
    return this.state.cart.length;
  }

  /**
   * Удаление записи по коду
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }
}

export default Store;
