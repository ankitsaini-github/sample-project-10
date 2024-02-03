import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiSlice';

const CartButton = (props) => {
  const dispatch=useDispatch()
  const showcarthandler=()=>{
    dispatch(uiActions.toggleCart())
  }
  return (
    <button className={classes.button} onClick={showcarthandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
