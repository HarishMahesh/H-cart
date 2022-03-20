import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Checkoutsteps from "../components/Checkoutsteps";
import { useSelector, useDispatch } from "react-redux";
import { addPaymentType } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

const Paymentselect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymenttype, setpaymenttype] = useState("paypal");

  const addpaymentHandeler = (e) => {
    e.preventDefault();
    dispatch(addPaymentType(paymenttype));
    navigate("/placeorder");
  };

  return (
    <Container className="login-container">
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Checkoutsteps signin="true" shipping="true" payment="true" />
          <h5>PAYMENT METHOD</h5>
          <form onSubmit={addpaymentHandeler}>
            <div>
              <label htmlFor="paymenttype">
                <b>Select Method</b>
              </label>
              <br />
              <input
                id="address"
                type="radio"
                name="paymenttype"
                value="paypal or credit card"
                required
                checked
                style={{ marginLeft: "15px", marginRight: "10px" }}
              ></input>
              Paypal or Credit Card
            </div>

            <Button
              style={{ marginTop: "10px", marginBottom: "10px" }}
              type="submit"
              variant="dark"
            >
              Continue
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Paymentselect;
