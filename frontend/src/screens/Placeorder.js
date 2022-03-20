import React, { useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Checkoutsteps from "../components/Checkoutsteps";
import { useNavigate } from "react-router-dom";
import "./Placeorder.css";
import { createOrder, resetOrder } from "../actions/orderActions";
import Error from "../components/Error";

const Placeorder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);
  const { order, loading, error } = orders;

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      navigate("/");
    }
  }, [navigate, cart]);

  function getTotalprice() {
    let total = 0;
    for (let i in cart.cartItems) {
      total += cart.cartItems[i].qty * cart.cartItems[i].price;
    }
    return total.toFixed(2);
  }

  cart.price = getTotalprice();

  if (cart.price < 500) {
    cart.shipping = 50;
  } else {
    cart.shipping = 0;
  }

  cart.tax = (cart.price * 0.05).toFixed(2);

  cart.total = (+cart.price + +cart.shipping + +cart.tax).toFixed(2);

  const placeOrderHandeler = () => {
    dispatch(createOrder(cart, user.userInfo));
  };

  useEffect(() => {
    if (order) {
      navigate(`/orders/${order._id}`);
      dispatch(resetOrder());
    }
  }, [navigate, order]);

  return (
    <Container style={{ marginTop: "25px" }}>
      <Row>
        <Checkoutsteps
          signin="true"
          shipping="true"
          payment="true"
          placeorder="true"
        />
      </Row>
      <Row>
        <Col md={7} lg={8}>
          <div>
            <h5>SHIPPING</h5>
            <p>
              <b>Address : </b>
              {`${cart.shippingAddress.address} , ${cart.shippingAddress.city} , ${cart.shippingAddress.postal}`}
            </p>
            <p>
              <b>Landmark : </b>
              {cart.shippingAddress.landmark}
            </p>
          </div>
          <hr />
          <div>
            <h5>PAYMENT METHOD</h5>
            <p>
              <b>Type : </b>
              {cart.paymentMethod}
            </p>
          </div>
          <hr />
          <div>
            <h5>ORDER ITEMS</h5>
            {cart.cartItems.length > 0
              ? cart.cartItems.map((item) => (
                  <Row key={item.product} style={{ marginTop: "15px" }}>
                    <Col xs={2}>
                      <div className="placeorder-img-container">
                        <img src={item.image} alt={item.name}></img>
                      </div>
                    </Col>
                    <Col xs={5}>
                      <b>{item.name}</b>
                    </Col>
                    <Col xs={5}>
                      <span>{`${item.qty} * ₹ ${item.price} = ₹ ${
                        item.qty * item.price
                      }`}</span>
                    </Col>
                  </Row>
                ))
              : ""}
          </div>
          <hr />
        </Col>
        <Col md={5} lg={4}>
          <div style={{ padding: "10px", border: "1px solid grey" }}>
            <h5 style={{ textAlign: "center" }}>Order Summary</h5>
            <hr />
            <div style={{ display: "flex" }}>
              <b style={{ flex: 2 }}>Price :</b>
              <span style={{ flex: 1 }}>{`₹ ${cart.price}`}</span>
            </div>
            <hr />
            <div style={{ display: "flex" }}>
              <b style={{ flex: 2 }}>Shipping charge :</b>
              <span style={{ flex: 1 }}>{`₹ ${cart.shipping}`}</span>
            </div>
            <hr />
            <div style={{ display: "flex" }}>
              <b style={{ flex: 2 }}>Tax :</b>
              <span style={{ flex: 1 }}>{`₹ ${cart.tax}`}</span>
            </div>
            <hr />
            <div style={{ display: "flex" }}>
              <b style={{ flex: 2 }}>Total :</b>
              <span style={{ flex: 1 }}>{`₹ ${cart.total}`}</span>
            </div>
            <hr />
            {error && <Error variant="danger">{error}</Error>}
            <Button
              variant="dark"
              style={{ width: "100%" }}
              onClick={placeOrderHandeler}
              disabled={loading}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "PLACE ORDER"
              )}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Placeorder;
