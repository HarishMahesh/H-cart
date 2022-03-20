import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./Login.css";
import Error from "../components/Error";
import axios from "axios";
import { useSelector } from "react-redux";

const UsersUpdate = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const userState = useSelector((state) => state.user);
  let { userInfo } = userState;

  const updateHandeler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      let { data } = await axios.put(
        `/api/users/${params.id}`,
        {
          name,
          email,
          isAdmin,
        },
        config
      );
      setLoading(false);
      navigate("/admin/users");
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  };

  const getUserDetails = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      let { data } = await axios.get(`/api/users/${params.id}`, config);
      console.log(data);
      setName(data.name);
      setEmail(data.email);
      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Container className="login-container">
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            variant="dark"
            onClick={() => navigate("/admin/users")}
          >
            Back
          </Button>
          <h5>User Details</h5>
          {error && <Error variant="danger">{error}</Error>}
          <form onSubmit={updateHandeler}>
            <div className="login-inp-container">
              <label htmlFor="name">
                <b>User Name</b>
              </label>
              <br />
              <input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">
                <b>Is Admin</b>
              </label>
              <input
                style={{ marginLeft: "10px" }}
                onChange={(e) => setIsAdmin(e.target.checked)}
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
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
                "Update User"
              )}
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersUpdate;
