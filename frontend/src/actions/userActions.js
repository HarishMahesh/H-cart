import axios from "axios";

export const loginUser = (email, password) => async (dispatch, getState) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    let { data } = await axios.post("/api/users/login", {
      email: email,
      password: password,
    });

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(getState().user.userInfo));
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: "LOGOUT_REQUEST",
  });

  dispatch({
    type: "RESET_CART",
  });

  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
};

export const registerUser =
  (name, email, password) => async (dispatch, getState) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      let { data } = await axios.post("/api/users/register", {
        email: email,
        password: password,
        name: name,
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify(getState().user.userInfo)
      );
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: user,
  });

  localStorage.setItem("userInfo", JSON.stringify(getState().user.userInfo));
};
