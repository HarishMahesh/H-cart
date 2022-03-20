import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./Login.css";
import Error from "../components/Error";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState(0);
  const [countInStock, setcountinstock] = useState(0);
  const [brand, setbrand] = useState("");
  const [loadingInfo, setloadinginfo] = useState(false);
  const [error, setError] = useState("");

  const userState = useSelector((state) => state.user);
  let { userInfo } = userState;

  const getDetails = async () => {
    setloadinginfo(true);
    try {
      let { data } = await axios.get(`/api/product/${params.id}`);
      setname(data.name);
      setcategory(data.category);
      setbrand(data.brand);
      setcountinstock(data.countInStock);
      setimage(data.image);
      setdescription(data.description);
      setprice(data.price);
      setloadinginfo(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.messsage);
      setloadinginfo(false);
    }
  };

  const createProduct = async () => {
    setLoading(true);
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      await axios.post(
        "/api/product/",
        {
          name,
          description,
          image,
          brand,
          category,
          price,
          countInStock,
        },
        config
      );
      setLoading(false);
      navigate("/admin/products");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      await axios.put(
        `/api/product/${params.id}`,
        {
          name,
          description,
          image,
          brand,
          category,
          price,
          countInStock,
        },
        config
      );
      setLoading(false);
      navigate("/admin/products");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.messsage);
    }
  };

  const updateHandeler = (e) => {
    e.preventDefault();
    if (params.id === "new") {
      createProduct();
    } else {
      updateProduct();
    }
  };

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/");
    }

    if (params.id !== "new") {
      getDetails();
    }
  }, []);

  return (
    <Container className="login-container">
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            variant="dark"
            onClick={() => navigate("/admin/products")}
          >
            Back
          </Button>
          <h5>{params.id !== "new" ? "Update" : "Create New Product"}</h5>
          {error && <Error variant="danger">{error}</Error>}
          {loadingInfo ? (
            "Loading..."
          ) : (
            <form onSubmit={updateHandeler}>
              <div className="login-inp-container">
                <label htmlFor="name">
                  <b>Name</b>
                </label>
                <br />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                ></input>
              </div>
              <div className="login-inp-container">
                <label htmlFor="description">
                  <b>Description</b>
                </label>
                <br />
                <input
                  id="description"
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                ></input>
              </div>
              <div className="login-inp-container">
                <label htmlFor="image">
                  <b>Image</b>
                </label>
                <br />
                <input
                  id="image"
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setimage(e.target.value)}
                ></input>
              </div>
              <div className="login-inp-container">
                <label htmlFor="brand">
                  <b>Brand</b>
                </label>
                <br />
                <input
                  id="brand"
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setbrand(e.target.value)}
                ></input>
              </div>
              <div className="login-inp-container">
                <label htmlFor="category">
                  <b>Category</b>
                </label>
                <br />
                <input
                  id="category"
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                ></input>
              </div>
              <div className="login-inp-container">
                <label htmlFor="price">
                  <b>Price</b>
                </label>
                <br />
                <input
                  id="price"
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                ></input>
              </div>
              <div className="login-inp-container">
                <label htmlFor="countInStock">
                  <b>CountInStock</b>
                </label>
                <br />
                <input
                  id="countInStock"
                  type="number"
                  required
                  value={countInStock}
                  onChange={(e) => setcountinstock(e.target.value)}
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
                ) : params.id !== "new" ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Button>
            </form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductUpdate;
