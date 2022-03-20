export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let item = action.payload;

      let existingItem = state.cartItems.find(
        (d) => d.product === item.product
      );

      if (existingItem) {
        let newCart = state.cartItems.map((d) =>
          d.product === existingItem.product ? item : d
        );
        return {
          ...state,
          cartItems: [...newCart],
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }
    case "REMOVE_FROM_CART": {
      let item = action.payload;

      let filteredCart = state.cartItems.filter(
        (i) => i.product !== item.product
      );

      return {
        ...state,
        cartItems: [...filteredCart],
      };
    }

    case "ADD_SHIPPING_ADDRESS": {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }

    case "ADD_PAYMENT_METHOD": {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    }

    case "RESET_CART": {
      return { cartItems: [], shippingAddress: {} };
    }
    default:
      return state;
  }
};
