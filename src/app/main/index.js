import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { Link } from 'react-router-dom';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.loadPage(1); // Загружаем первую страницу при монтировании
  }, [store]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    total: state.catalog.total,
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback(page => {
      store.actions.catalog.loadPage(page);
    }, [store]),
    changeLimit: useCallback(limit => {
      store.actions.catalog.setLimit(limit); // Устанавливаем новый лимит
      store.actions.catalog.loadPage(1); // Сбрасываем на первую страницу
    }, [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item item={item} onAdd={callbacks.addToBasket}>
            <Link to={`/product/${item._id}`} className="Item-title-link">
              {item.title}
            </Link>
          </Item>
        );
      },
      [callbacks.addToBasket],
    ),
  };

  const totalPages = Math.ceil(select.total / select.limit);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={select.currentPage}
          onPageChange={callbacks.changePage}
          limit={select.limit}
          onLimitChange={callbacks.changeLimit}
        />
      )}
    </PageLayout>
  );
}

export default memo(Main);
