import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { registerUser } from "../actions/userActions";
import Error from "../components/Error";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [retypePassword, setReTypePassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const userState = useSelector((state) => state.user);
  let { userInfo, error, loading } = userState;

  const signInHandeler = (event) => {
    event.preventDefault();
    if (retypePassword === password) {
      dispatch(registerUser(name, email, password));
      setMessage();
    } else {
      setMessage("Password and confirm password does not match");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <Container className="login-container">
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <h5>REGISTER</h5>
          {message && <Error variant="danger">{message}</Error>}
          {error && <Error variant="danger">{error}</Error>}
          <form onSubmit={signInHandeler}>
            <div className="login-inp-container">
              <label htmlFor="name">
                <b>User Name</b>
              </label>
              <br />
              <input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="User name"
                required
              ></input>
            </div>
            <div className="login-inp-container">
              <label htmlFor="email">
                <b>Email Address</b>
              </label>
              <br />
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
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
                type="password"
                required
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
                placeholder="Confirm password"
                type="password"
                required
              ></input>
            </div>
            <Button
              style={{ marginTop: "10px", marginBottom: "10px" }}
              type="submit"
              variant="dark"
              disabled={loading ? true : false}
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
                "SIGN IN"
              )}
            </Button>
            <br />
            <span>
              Have an account?{" "}
              <b
                className="login-registerlink"
                onClick={() => navigate("/signin")}
              >
                SignUp
              </b>
            </span>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
