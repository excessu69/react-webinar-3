import React, { useCallback,useState  } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/modal/index.js';
import { plural } from './utils.js';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [buttonText, setButtonText] = useState('Пусто');
  const [isCartOpen, setCartOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
      updateButtonText();
    }, [store]),

    onAddToCart: useCallback((code) => {
      const item = list.find(i => i.code === code);
      if (item) {
        store.addToCart(code);
        updateButtonText();
      } else {
        console.error("Товар не найден");
      }
    }, [list, store]),
  };

  const updateButtonText = () => {
    const totalCount = store.getTotalCount();
    const totalPrice = store.getTotalPrice();
    setButtonText(`${totalCount} ${plural(totalCount, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalPrice} ₽`);
  };

  const handleCartToggle = useCallback(() => {
    setCartOpen(prev => !prev);
  }, []);

  const handleRemoveFromCart = useCallback((code) => {
    store.onRemoveCart(code);
    updateButtonText();
  }, [store]);

  const cartItems = store.getState().cart;

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onAdd={handleCartToggle}
        uniqueCount={store.getUniqueCount()}
        totalPrice={store.getTotalPrice()}
      />
      <List
        list={list}
        onDeleteItem={callbacks.onDeleteItem}
        onAddToCart={callbacks.onAddToCart}
      />
      {isCartOpen && (
        <CartModal items={cartItems}
                   onClose={handleCartToggle}
                   onRemoveCart={handleRemoveFromCart}/>
      )}
    </PageLayout>
  );
}

export default App;
