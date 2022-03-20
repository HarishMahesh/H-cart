import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Error from "../components/Error";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty");
  let { cartItems } = cart;
  let { userInfo } = user;

  useEffect(() => {
    if (params.id) {
      dispatch(addToCart(params.id, qty));
    }
  }, [dispatch, params.id]);

  function getdropdowOptions(product) {
    let options = [];
    if (product.countInStock > 0) {
      for (let i = 1; i <= product.countInStock; ++i) {
        options.push(<option value={i}>{i}</option>);
      }
    }
    return options;
  }

  function getTotalPrice() {
    let totalPrice = 0;
    for (let i in cartItems) {
      totalPrice += cartItems[i].price * cartItems[i].qty;
    }
    return totalPrice;
  }

  function getTotalquantity() {
    let quantity = 0;
    for (let i in cartItems) {
      quantity += +cartItems[i].qty;
    }
    return quantity;
  }

  function removeHandeler(item) {
    dispatch(removeFromCart(item));
  }

  function checkoutHandeler() {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/signin?redirect=shipping/");
    }
  }

  return (
    <Container>
      <h5 className="cart-header">SHOPPING CART</h5>
      <Row>
        <Col md={8} className="cart-details-container">
          {cartItems.length <= 0 ? (
            <Error variant="info">No Items in Cart</Error>
          ) : (
            cartItems.map((item) => (
              <>
                <Row>
                  <Col xs={2}>
                    <div className="cart-img-container">
                      <img src={item.image} alt={item.name}></img>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <h5>{item.name}</h5>
                  </Col>
                  <Col xs={2}>{`₹ ${item.price}`}</Col>
                  <Col xs={3}>
                    <Form.Select
                      aria-label="Default select example"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {getdropdowOptions(item)}
                    </Form.Select>
                  </Col>
                  <Col xs={1}>
                    <i
                      class="fas fa-trash"
                      onClick={() => removeHandeler(item)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </Col>
                </Row>
                <hr />
              </>
            ))
          )}
        </Col>

        {cartItems.length > 0 && (
          <Col md={4} className="cart-checkout-conatiner">
            <div>
              <div>
                <h6>{`SUBTOTAL (${getTotalquantity()}) ITEMS`}</h6>
              </div>
              <span>{`₹ ${getTotalPrice()}`}</span>
              <hr />
              <Button
                style={{ width: "100%" }}
                variant="dark"
                onClick={checkoutHandeler}
              >
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
