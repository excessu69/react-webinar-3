import React from 'react';
import './style.css';
import { formatPrice } from '../../utils';
import PropTypes from 'prop-types';

function Item({ item, onAddToCart, onDelete, isCart = false }) {
  return (
    <div className={'Item' + (item.selected ? ' Item_selected' : '')}>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">{formatPrice(item.price)}</div>
      {isCart && <div className="Item-count">Количество: {item.count}</div>}
      <div className="Item-actions">
        {isCart ? (
          <button onClick={() => onDelete(item.code)}>Удалить</button>
        ) : (
          <button onClick={() => onAddToCart(item.code)}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func,
  isCart: PropTypes.bool,
};

Item.defaultProps = {
  onDeleteItem: () => {},
  isCart: false,
};


export default React.memo(Item);
