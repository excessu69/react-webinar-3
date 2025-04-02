import React from 'react';
import './style.css';
import { formatPrice, plural } from '../../utils';
import PropTypes from 'prop-types';

function Controls({ onAdd, buttonText = 'Пусто', uniqueCount, totalPrice }) {

  return (
    <div className="Controls">
      <button onClick={onAdd}>
        <span className="cart-icon"></span>
        {uniqueCount > 0
          ? `${uniqueCount} ${plural(uniqueCount, { one: 'товар', few: 'товара', many: 'товаров' })} / ${formatPrice(totalPrice)}`
          : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  uniqueCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Controls);
