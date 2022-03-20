import axios from "axios";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: "PRODUCT_LIST_REQUEST",
  });

  try {
    let { data } = await axios.get("/api/product/");
    dispatch({
      type: "PRODUCT_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  dispatch({
    type: "PRODUCT_DETAILS_REQUEST",
  });

  try {
    let { data } = await axios.get(`/api/product/${id}`);
    dispatch({
      type: "PRODUCT_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id, token) => async (dispatch) => {
  dispatch({
    type: "PRODUCT_DELETE_REQUEST",
  });

  try {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/product/${id}`, config);
    let { data } = await axios.get("/api/product/");
    dispatch({
      type: "PRODUCT_DELETE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const updateReview =
  (token, rating, comment, id) => async (dispatch) => {
    dispatch({
      type: "PRODUCT_REVIEW_REQUEST",
    });
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.post(
        `/api/product/${id}/reviews`,
        {
          rating,
          comment,
        },
        config
      );
      dispatch({
        type: "PRODUCT_REVIEW_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PRODUCT_REVIEW_FAIL",
        payload: error.response.data.message,
      });
    }
  };
