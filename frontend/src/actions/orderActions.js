import axios from "axios";

const reduceStock = async (items, user) => {
  let config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    await items.map(async (i) => {
      let { data } = await axios.get(`/api/product/${i.product}`);
      let stock = data.countInStock;
      stock = stock - i.qty;
      await axios.put(
        `/api/product/changeStock/${i.product}`,
        { countInStock: stock },
        config
      );
    });

    return 1;
  } catch (error) {
    console.log("bye");
    return 0;
  }
};

export const createOrder = (data, user) => async (dispatch) => {
  dispatch({
    type: "ORDER_REQUEST",
  });

  let payload = {
    user: user._id,
    productItems: data.cartItems,
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
    taxPrice: data.tax,
    shippingPrice: data.shipping,
    totalPrice: data.total,
  };

  let config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    let { data } = await axios.post("/api/orders/", payload, config);

    let result = await reduceStock(data.productItems, user);

    if (result) {
      dispatch({
        type: "ORDER_SUCCESS",
        payload: data,
      });
      dispatch({ type: "RESET_CART" });
    } else {
      dispatch({ type: "ORDER_FAILURE", payload: "Out of stock - error" });
    }
  } catch (error) {
    dispatch({
      type: "ORDER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch({ type: "ORDER_RESET" });
};
