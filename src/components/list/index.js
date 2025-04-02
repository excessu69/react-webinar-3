import React from 'react';
import Item from '../item';
import './style.css';
import PropTypes from 'prop-types';

function List({ list, onDeleteItem, onAddToCart, isCart = false }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item
            item={item}
            onDelete={onDeleteItem}
            onAddToCart={onAddToCart}
            isCart={isCart}
          />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      selected: PropTypes.bool,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func,
  isCart: PropTypes.bool,
};

List.defaultProps = {
  onDeleteItem: () => {},
  isCart: false,
}

export default React.memo(List);
