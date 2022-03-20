export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCT_LIST_FAIL":
      return { loading: false, error: action.payload };

    case "PRODUCT_DELETE_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_DELETE_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCT_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { loading: true, product: {} };
    case "PRODUCT_DETAILS_SUCCESS":
      return { loading: false, product: action.payload };
    case "PRODUCT_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_REVIEW_REQUEST":
      return { ...state, loadingReview: true };
    case "PRODUCT_REVIEW_SUCCESS":
      return { loadingReview: false, product: action.payload };
    case "PRODUCT_REVIEW_FAIL":
      return { ...state, loadingReview: false, errorReview: action.payload };
    default:
      return state;
  }
};
