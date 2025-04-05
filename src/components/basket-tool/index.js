import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import useSelector from '../../store/use-selector';

function BasketTool({ onOpen }) {
  const cn = bem('BasketTool');

  // Подписываемся на состояние корзины
  const { sum, amount } = useSelector(state => ({
    sum: state.basket.sum,
    amount: state.basket.amount,
  }));

  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
            : `пусто`}
        </span>
      </button>
    </div>
  );
}

export default memo(BasketTool);
