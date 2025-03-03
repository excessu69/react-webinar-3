import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../button';
import './style.css';

function ItemBasket(props) {
  const { onRemove = () => {}, labelCurr = '₽', labelUnit = 'шт', labelDelete = 'Удалить' } = props;
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        {props.link ? (
          <Link to={props.link} onClick={props.onLink}>
            {props.item.title}
          </Link>
        ) : (
          props.item.title
        )}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {labelUnit}
        </div>
        <div className={cn('cell')}>
          {numberFormat(props.item.price)} {labelCurr}
        </div>
        <div className={cn('cell')}>
          <Button style='delete' onClick={callbacks.onRemove} title={labelDelete} />
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  link: PropTypes.string,
  onLink: PropTypes.func,
  onRemove: PropTypes.func,
  labelCurr: PropTypes.string,
  labelDelete: PropTypes.string,
  labelUnit: PropTypes.string,
};

export default memo(ItemBasket);
