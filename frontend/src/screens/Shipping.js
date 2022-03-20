import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import Checkoutsteps from "../components/Checkoutsteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postal, setPostal] = useState(shippingAddress.postal);
  const [landmark, setLandmark] = useState(shippingAddress.landmark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addAddressHandeler = (e) => {
    e.preventDefault();
    dispatch(
      addShippingAddress({
        address,
        city,
        postal,
        landmark,
      })
    );

    navigate("/payment");
  };

  return (
    <Container className="login-container">
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Checkoutsteps signin="true" shipping="true" />
          <h5>SHIPPING</h5>
          <form onSubmit={addAddressHandeler}>
            <div className="login-inp-container">
              <label htmlFor="address">
                <b>Address</b>
              </label>
              <br />
              <input
                id="address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="Address"
                required
              ></input>
            </div>
            <div className="login-inp-container">
              <label htmlFor="city">
                <b>City</b>
              </label>
              <br />
              <input
                id="city"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              ></input>
            </div>
            <div className="login-inp-container">
              <label htmlFor="postalcode">
                <b>Postal Code</b>
              </label>
              <br />
              <input
                onChange={(e) => setPostal(e.target.value)}
                id="postalcode"
                value={postal}
                placeholder="Postal Code"
                type="number"
                required
              ></input>
            </div>
            <div className="login-inp-container">
              <label htmlFor="landmark">
                <b>Landmark</b>
              </label>
              <br />
              <input
                onChange={(e) => setLandmark(e.target.value)}
                id="landmark"
                value={landmark}
                placeholder="Landmark"
                type="text"
                required
              ></input>
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

export default Shipping;
