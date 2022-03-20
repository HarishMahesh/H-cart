export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_REQUEST": {
      return {
        loading: true,
      };
    }
    case "ORDER_SUCCESS": {
      return {
        loading: false,
        order: action.payload,
      };
    }
    case "ORDER_FAILURE": {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case "ORDER_RESET": {
      return {};
    }
    default:
      return { ...state };
  }
};
