import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      total: 0, // Общее количество товаров
      currentPage: 1, // Текущая страница
      limit: 10, // Количество товаров на странице
    };
  }

  setLimit(limit) {
    this.setState({
      ...this.getState(),
      limit,
    }, 'Изменен лимит элементов на странице');
  }

  async loadPage(page = 1) {
    const state = this.getState();
    const skip = (page - 1) * state.limit;

    console.log('Fetching data for page:', page, 'with skip:', skip, 'and limit:', state.limit);

    const response = await fetch(
      `/api/v1/articles?limit=${state.limit}&skip=${skip}&fields=items(_id,title,price),count`
    );
    const json = await response.json();

    console.log('Server Response:', json);

    this.setState(
      {
        ...state,
        list: json.result.items, // Массив товаров
        total: json.result.count, // Общее количество товаров
        currentPage: page,
      },
      `Загружена страница ${page} каталога`,
    );
  }
}

export default Catalog;
