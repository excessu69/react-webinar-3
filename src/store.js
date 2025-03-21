/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      usedCodes: new Set(),
      ...initState
    };
    this.listeners = [];
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

  /**
   * Генерирует уникальный код, который еще не использовался
   */
  generateUniqueCode() {
    let newCode = 8;
    while (this.state.usedCodes.has(newCode)) {
      newCode++;
    }
    return newCode;
  }

  /**
   * Рандомная генерация чисел
   */
  // generateUniqueCode() {
  //   let newCode;
  //   do {
  //     newCode = Math.floor(Math.random() * 999) + 1;
  //   } while (this.state.usedCodes.has(newCode));
  //   return newCode;
  // }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.generateUniqueCode();

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
      usedCodes: new Set(this.state.usedCodes).add(newCode)
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param event
   */
  selectItem(code, event) {
    const isCtrlPressed = event?.ctrlKey || event?.metaKey;

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (!item.selected) {
            return { ...item, selected: true, selectionCount: (item.selectionCount || 0) + 1 };
          }
          return { ...item, selected: false };
        }
        return isCtrlPressed ? item : { ...item, selected: false };
      }),
    });
  }
}

export default Store;
