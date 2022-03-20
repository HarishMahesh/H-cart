import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../actions/userActions";
import Error from "../components/Error";

const Profile = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [retypePassword, setReTypePassword] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [error1, setError1] = useState();
  const [success, setSuccess] = useState(false);

  const [orders, setOrders] = useState([]);
  const [orderloading, setOrderLoading] = useState(false);
  const [ordererror, setOrderError] = useState();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  let { userInfo } = user;

  const getAllorders = async () => {
    setOrderLoading(true);
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      let { data } = await axios.get("/api/orders/myorders", config);
      setOrders(data);
      setOrderLoading(false);
    } catch (error) {
      setOrderError(error.response.data.message);
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      getAllorders();
    } else {
      alert("Please login to visit this page");
      navigate("/");
    }
  }, [userInfo, navigate]);

  const updateHandeler = async () => {
    setLoading(true);

    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    if ((password || retypePassword) && password !== retypePassword) {
      setLoading(false);
      setMessage("Password and confirm password are not name");
    } else {
      setMessage();
      try {
        let payload;
        if (password) {
          payload = {
            name,
            email,
            password,
          };
        } else {
          payload = {
            name,
            email,
          };
        }
        let { data } = await axios.put("/api/users/edit", payload, config);
        dispatch(updateUser(data));
        setLoading(false);
        setError1();
        setSuccess(true);
      } catch (error) {
        console.log(error.response.data.message);
        setError1(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <Container style={{ marginTop: "25px" }}>
      <Row>
        <Col md={4}>
          <h5>USER PROFILE</h5>
          {success && <Error variant="success">User Details Updated</Error>}
          {message && <Error variant="danger">{message}</Error>}
          {error1 && <Error variant="danger">{error1}</Error>}
          <div className="login-inp-container">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <br />
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="User name"
              value={name}
            ></input>
          </div>
          <div className="login-inp-container">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <br />
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </div>
          <div className="login-inp-container">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
              value={password}
              type="password"
            ></input>
          </div>
          <div className="login-inp-container">
            <label htmlFor="repassword">
              <b>Confirm Password</b>
            </label>
            <br />
            <input
              onChange={(e) => setReTypePassword(e.target.value)}
              id="repassword"
              value={retypePassword}
              placeholder="Confirm password"
              type="password"
            ></input>
          </div>
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            variant="dark"
            disabled={loading ? true : false}
            onClick={updateHandeler}
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
              "UPDATE"
            )}
          </Button>
        </Col>
        <Col md={8}>
          <h5>MY ORDERS</h5>
          {orderloading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ display: "block", margin: "auto" }}
            />
          )}
          {ordererror && <Error variant="danger">{ordererror}</Error>}
          {!orderloading && !ordererror && (
            <Table striped bordered hover size="sm">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {orders.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.createdAt.substring(0, 10)}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.isPaid ? "Paid" : "Not Paid"}</td>
                    <td>{item.isDelivered ? "Delivered" : "Not delivered"}</td>
                    <td>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/orders/${item._id}`)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
