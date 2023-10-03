import { useSelector } from 'react-redux';
import { cartItemTotalSelector } from './selector';

CartFeature.propTypes = {};

function CartFeature(props) {
  const total = useSelector(cartItemTotalSelector);

  return <div>{total}</div>;
}

export default CartFeature;
