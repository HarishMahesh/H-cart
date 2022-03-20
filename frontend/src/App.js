import Header from "./components/Header";
import Products from "./screens/Products";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./screens/ProductDetail";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Shipping from "./screens/Shipping";
import Paymentselect from "./screens/Paymentselect";
import Placeorder from "./screens/Placeorder";
import OrderDetails from "./screens/OrderDetails";
import UsersList from "./screens/UsersList";
import UsersUpdate from "./screens/UsersUpdate";
import ProductList from "./screens/ProductList";
import ProductUpdate from "./screens/ProductUpdate";
import OrderList from "./screens/OrderList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Paymentselect />} />
        <Route path="/placeorder" element={<Placeorder />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/users/:id" element={<UsersUpdate />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/:id" element={<ProductUpdate />} />
        <Route path="/admin/orders" element={<OrderList />} />
      </Routes>
    </>
  );
}

export default App;
