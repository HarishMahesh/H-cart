import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "../reducers/productReducer";
import { cartReducer } from "../reducers/cartReducer";
import { loginUserReducer } from "../reducers/userReducer";
import { orderReducer } from "../reducers/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: loginUserReducer,
  orders: orderReducer,
});

let cartItems = localStorage.getItem("cartItems");
let userInfo = localStorage.getItem("userInfo");
let shippingAddress = localStorage.getItem("shippingAddress");

if (cartItems) {
  cartItems = JSON.parse(cartItems);
} else {
  cartItems = [];
}

if (userInfo) {
  userInfo = JSON.parse(userInfo);
} else {
  userInfo = "";
}

if (shippingAddress) {
  shippingAddress = JSON.parse(shippingAddress);
} else {
  shippingAddress = "";
}

const initialSate = {
  cart: {
    cartItems,
    shippingAddress,
  },
  user: {
    userInfo,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialSate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
