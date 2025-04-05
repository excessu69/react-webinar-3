import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import ProductPage from '../../components/product-page';
import BasketTool from '../../components/basket-tool';

function Product() {
  const { id } = useParams();
  const store = useStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title),category(title)`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        setProduct({
          _id: data.result._id,
          title: data.result.title,
          description: data.result.description,
          madeIn: data.result.madeIn?.title,
          category: data.result.category?.title,
          edition: data.result.edition,
          price: data.result.price,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToBasket = (productId) => {
    store.actions.basket.addToBasket(productId);
  };

  if (loading) return <div></div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <ProductPage
      product={product}
      onAddToBasket={handleAddToBasket}
      controls={<BasketTool
        onOpen={() => store.actions.modals.open('basket')}
        amount={store.state.basket.amount}
        sum={store.state.basket.sum} />}
    />
  );
}

export default memo(Product);
