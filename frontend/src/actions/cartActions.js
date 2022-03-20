import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  let { data } = await axios.get(`/api/product/${id}`);

  dispatch({
    type: "ADD_TO_CART",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (product) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: product,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addShippingAddress = (data) => async (dispatch, getState) => {
  dispatch({
    type: "ADD_SHIPPING_ADDRESS",
    payload: data,
  });

  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().cart.shippingAddress)
  );
};

export const addPaymentType = (data) => async (dispatch) => {
  dispatch({
    type: "ADD_PAYMENT_METHOD",
    payload: data,
  });
};
