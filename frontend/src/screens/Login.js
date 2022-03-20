import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  let { userInfo, error, loading } = userState;

  let redirect = "";

  redirect = searchParams.get("redirect");

  const signInHandeler = (event) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect ? redirect : ""}`);
    }
  }, [userInfo, navigate]);

  return (
    <Container className="login-container">
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <h5>SIGN IN</h5>
          {error && <Error variant="danger">{error}</Error>}
          <form onSubmit={signInHandeler}>
            <div className="login-inp-container">
              <label htmlFor="username">
                <b>Email Address</b>
              </label>
              <br />
              <input
                id="username"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
                type="password"
                placeholder="Password"
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
              New User?{" "}
              <b
                className="login-registerlink"
                onClick={() => navigate("/register")}
              >
                Register
              </b>
            </span>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
