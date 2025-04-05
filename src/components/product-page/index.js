import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageLayout from '../page-layout';
import Head from '../head';
import Button from '../button';
import './style.css';

function ProductPage({ product, onAddToBasket, controls }) {
  return (
    <PageLayout>
      <Head title={product.title} />
      <div className="ProductPage">
        {/* Ссылка на главную страницу и блок управления корзиной */}
        <div className="ProductPage-header">
          <Link to="/" className="ProductPage-home">Главная</Link>
          <div className="ProductPage-controls">{controls}</div>
        </div>

        {/* Основная информация */}
        <p className="ProductPage-description">{product.description || 'Описание отсутствует'}</p>

        {/* Список категорий */}
        <div className="ProductPage-categories">
          <div className="ProductPage-category">
            <span className="ProductPage-category-label">Страна производитель:</span>
            <span className="ProductPage-category-value">{product.madeIn || 'Не указано'}</span>
          </div>
          <div className="ProductPage-category">
            <span className="ProductPage-category-label">Категория:</span>
            <span className="ProductPage-category-value">{product.category || 'Не указано'}</span>
          </div>
          <div className="ProductPage-category">
            <span className="ProductPage-category-label">Год выпуска:</span>
            <span className="ProductPage-category-value">{product.edition || 'Не указан'}</span>
          </div>
        </div>

        <h2>Цена: {product.price} ₽</h2>

        <Button
          title="Добавить"
          style="primary"
          onClick={() => onAddToBasket(product._id)}
        />
      </div>
    </PageLayout>
  );
}

ProductPage.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    madeIn: PropTypes.string, // Страна производитель
    category: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  onAddToBasket: PropTypes.func.isRequired,
  controls: PropTypes.node, // Блок управления корзиной
};

ProductPage.defaultProps = {
  controls: null,
};

export default ProductPage;
