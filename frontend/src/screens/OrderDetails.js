import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Placeorder.css";
import Error from "../components/Error";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

const OrderDetails = () => {
  let params = useParams();

  const [fetchagain, setFetchagain] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [orderdetail, setOrderDetail] = useState();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const fetchOrderdetail = async () => {
    setLoading(true);
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      let { data } = await axios.get(`/api/orders/${params.id}`, config);
      setOrderDetail(data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderdetail();
  }, [fetchagain]);

  function getTotalprice() {
    let total = 0;
    for (let i in orderdetail.productItems) {
      total +=
        orderdetail.productItems[i].qty * orderdetail.productItems[i].price;
    }
    return total.toFixed(2);
  }

  const updateOrderTopay = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      let { data } = await axios.put(`/api/orders/${params.id}`, {}, config);
      setFetchagain(!fetchagain);
    } catch (err) {
      console.log(err.response);
      alert("Internal server error try after sometime");
    }
  };

  const devileryHandeler = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      let { data } = await axios.put(
        `/api/orders/${params.id}/delivered`,
        {},
        config
      );
      setFetchagain(!fetchagain);
    } catch (err) {
      console.log(err.response);
      alert("Internal server error try after sometime");
    }
  };

  const successPayHandeler = (paymentResult) => {
    console.log(paymentResult);
    updateOrderTopay();
  };

  return (
    <Container style={{ marginTop: "25px" }}>
      {loading ? (
        <Spinner
          style={{ display: "block", marging: "auto" }}
          animation="border"
        />
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <Row>
          <Col md={7} lg={8}>
            <div>
              <h5>{`ORDER ${orderdetail._id}`}</h5>
              <p>
                <b>Address : </b>
                {`${orderdetail.shippingAddress.address} , ${orderdetail.shippingAddress.city} , ${orderdetail.shippingAddress.postal}`}
              </p>
              <p>
                <b>Landmark : </b>
                {orderdetail.shippingAddress.landmark}
              </p>
              {orderdetail.isDelivered ? (
                <Error variant="success">{`Delivered at ${orderdetail.deliveredAt}`}</Error>
              ) : (
                <Error variant="danger">Not Delivered</Error>
              )}
            </div>
            <hr />
            <div>
              <h5>PAYMENT METHOD</h5>
              <p>
                <b>Type : </b>
                {orderdetail.paymentMethod}
              </p>
              {orderdetail.isPaid ? (
                <Error variant="success">{`Paid at ${orderdetail.paidAt}`}</Error>
              ) : (
                <Error variant="danger">Not paid</Error>
              )}
            </div>
            <hr />
            <div>
              <h5>ORDER ITEMS</h5>
              {orderdetail.productItems.length > 0
                ? orderdetail.productItems.map((item) => (
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
                <span style={{ flex: 1 }}>{`₹ ${getTotalprice()}`}</span>
              </div>
              <hr />
              <div style={{ display: "flex" }}>
                <b style={{ flex: 2 }}>Shipping charge :</b>
                <span
                  style={{ flex: 1 }}
                >{`₹ ${orderdetail.shippingPrice}`}</span>
              </div>
              <hr />
              <div style={{ display: "flex" }}>
                <b style={{ flex: 2 }}>Tax :</b>
                <span style={{ flex: 1 }}>{`₹ ${orderdetail.taxPrice}`}</span>
              </div>
              <hr />
              <div style={{ display: "flex" }}>
                <b style={{ flex: 2 }}>Total :</b>
                <span style={{ flex: 1 }}>{`₹ ${orderdetail.totalPrice}`}</span>
              </div>
              {!orderdetail.isPaid && (
                <PayPalButton
                  amount={orderdetail.totalPrice}
                  onSuccess={successPayHandeler}
                  currency="USD"
                />
              )}
              {userInfo &&
                userInfo.isAdmin &&
                orderdetail.isPaid &&
                !orderdetail.isDelivered && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      style={{ marginTop: "10px" }}
                      variant="dark"
                      onClick={() => devileryHandeler()}
                    >
                      Mark Order as Delivered
                    </Button>
                  </div>
                )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderDetails;
