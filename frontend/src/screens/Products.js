import React, { useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [topProdcts, setTopproducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  let { error, loading, products } = productList;

  const getTopratedProducts = async () => {
    try {
      let { data } = await axios.get("api/product/toprated");
      setTopproducts(data);
    } catch (error) {
      alert("some error carosel cannot be displayed");
    }
  };

  useEffect(() => {
    dispatch(listProducts());
    getTopratedProducts();
  }, [dispatch]);

  return (
    <>
      {topProdcts.length > 0 && (
        <Carousel style={{ marginTop: "20px" }}>
          {topProdcts.map((i) => (
            <Carousel.Item
              key={i._id}
              style={{
                backgroundColor: "black",
                padding: "20px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/product/${i._id}`)}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={i.image}
                  alt={i._id}
                  style={{ height: "300px", width: "300px" }}
                />

                <h3
                  style={{
                    color: "white",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {i.name}
                </h3>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      <Container>
        <h5 className="products-header">LATEST PRODUCTS</h5>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error variant="danger">{error}</Error>
        ) : (
          <Row>
            {products.map((product) => (
              <Col
                sm={12}
                md={6}
                lg={3}
                key={product._id}
                className="card-productItem"
              >
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Products;
