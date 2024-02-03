import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiSlice';

const CartButton = (props) => {
  const dispatch=useDispatch()

  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const showcarthandler=()=>{
    dispatch(uiActions.toggleCart())
  }
  return (
    <button className={classes.button} onClick={showcarthandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
