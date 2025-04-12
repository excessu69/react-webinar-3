import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: 'all', // Используем 'all' вместо null
      },
      categories: [], // Список категорий
      count: 0,
      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit'))
      validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('category')) validParams.category = urlParams.get('category');

    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async loadCategories() {
    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      if (!response.ok) {
        throw new Error(`Ошибка загрузки категорий: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      // Логируем полный ответ API для диагностики
      console.log('Ответ API категорий:', json);

      // Извлекаем категории из json.result.items
      const categories = Array.isArray(json.result?.items) ? json.result.items : [];
      const formattedCategories = this.formatCategories(categories);

      this.setState({ ...this.getState(), categories: formattedCategories }, 'Загружены категории');

      await this.setParams({}, true);
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
      this.setState({ ...this.getState(), categories: [] }, 'Ошибка загрузки категорий');
    }
  }

  async resetParams(newParams = {}) {
    const params = { ...this.initState().params, ...newParams };

    await this.setParams(params, true);

    this.setState({ ...this.getState(), params: { ...params, category: 'all' } }, 'Сброс параметров');
  }

  /**
   * Форматирование категорий с учетом иерархии
   * @param categories
   * @return {Array}
   */
  formatCategories(categories) {
    const map = {};
    categories.forEach(cat => (map[cat._id] = { ...cat, children: [] }));
    const result = [];
    categories.forEach(cat => {
      if (cat.parent?._id) {
        map[cat.parent._id].children.push(map[cat._id]);
      } else {
        result.push(map[cat._id]);
      }
    });
    const flatten = (items, prefix = '') =>
      items.flatMap(item => [
        { value: item._id, title: `${prefix}${item.title}` },
        ...flatten(item.children, `${prefix}-`),
      ]);
    return [{ value: 'all', title: 'Все' }, ...flatten(result)];
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };


    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      'Установлены параметры каталога',
    );

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };

    // Если категория не равна 'all', добавляем параметр категории в запрос
    if (params.category !== 'all') {
      apiParams['search[category]'] = params.category;
    }

    try {
      const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
      if (!response.ok) {
        throw new Error(`Ошибка загрузки товаров: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          count: json.result.count,
          waiting: false,
        },
        'Загружен список товаров из АПИ',
      );
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
      this.setState({ ...this.getState(), list: [], waiting: false }, 'Ошибка загрузки товаров');
    }
  }
}

export default CatalogState;
