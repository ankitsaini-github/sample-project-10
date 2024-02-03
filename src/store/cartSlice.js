import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialState = {
  items: [],
  totalQuantity: 0,
  cartchange:false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state,action){
      state.totalQuantity = action.payload.totalQuantity;
      state.items=action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.cartchange=true;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.cartchange=true;
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
        existingItem.totalPrice - action.payload.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export const fetchCartData=() => {
  return async(dispatch) => {
    const fetchData=async() => {
      const response = await fetch('https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/shoppingcart.json');
      if(!response.ok){
        throw new Error('Fetching cart data failed.');
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData=await fetchData();
      dispatch(cartActions.replaceCart({
        items:cartData.items || [],
        totalQuantity:cartData.totalQuantity,
      }))

    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  }
}

export const sendCartData=(cart)=>{
  return async(dispatch)=>{
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async() => { 
      const response = await fetch(
        'https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/shoppingcart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
  
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }

  }
}

export default cartSlice.reducer;
