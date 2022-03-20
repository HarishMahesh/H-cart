import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import "./ProductDetail.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";

const ProductDetail = () => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading, loadingReview, errorReview } =
    productDetails;

  const userState = useSelector((state) => state.user);
  let { userInfo } = userState;

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id]);

  let options = [];
  if (product.countInStock > 0) {
    for (let i = 1; i <= product.countInStock; ++i) {
      options.push(<option value={i}>{i}</option>);
    }
  }

  const addToCartHandeler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  const reviewHandeler = (e) => {
    e.preventDefault();
    dispatch(updateReview(userInfo.token, rating, comment, params.id));
  };
  return (
    <>
      <Container>
        <Button
          variant="secondary"
          className="productDetails-btn"
          onClick={() => navigate("/")}
        >
          Go BACK
        </Button>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error variant="danger">{error}</Error>
        ) : (
          <Row>
            <Col md={6} className="product-detail-imgcontainer">
              <img src={product.image} alt={product.name}></img>
            </Col>
            <Col md={6} lg={3}>
              <div>
                <h3>{product.name}</h3>
                <hr />
                <Rating
                  rate={product.rating}
                  text={` ${product.numReviews} Reviews`}
                />
                <hr />
                <span>{product.description}</span>
              </div>
            </Col>
            <Col md={{ span: 6, offset: 3 }} lg={{ span: 3, offset: 0 }}>
              <div className="productDetails-checkout">
                <div>
                  <b>Price :</b>

                  <span>{`₹ ${product.price}`}</span>
                </div>
                <hr />
                <div>
                  <b>Stock :</b>
                  <span>
                    {product.countInStock >= 1 ? "In stock" : "Out of stock"}
                  </span>
                </div>
                <hr />
                {product.countInStock >= 1 && (
                  <>
                    <div style={{ gap: "10px" }}>
                      <b style={{ flex: "1" }}>Qty :</b>
                      <Form.Select
                        aria-label="Default select example"
                        style={{ flex: "1" }}
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {options}
                      </Form.Select>
                    </div>
                    <hr />
                  </>
                )}
                <footer>
                  <Button
                    variant="dark"
                    disabled={product.countInStock <= 0}
                    onClick={() => addToCartHandeler()}
                  >
                    ADD TO CART
                  </Button>
                </footer>
              </div>
            </Col>
            <Col md={6}>
              <h4>Reviews</h4>

              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((r) => (
                  <>
                    <div>
                      <b>{r.name}</b>
                      <Rating rate={r.rating}></Rating>
                      <p>{r.createdAt.substring(0, 10)}</p>
                      <p>{r.comment}</p>
                    </div>
                    <hr></hr>
                  </>
                ))
              ) : (
                <Error variant="warning">No reviews for this product</Error>
              )}

              <h4 style={{ marginTop: "20px" }}>Write a review..</h4>
              {errorReview && <Error variant="danger">{errorReview}</Error>}

              {userInfo ? (
                <form onSubmit={reviewHandeler}>
                  <div className="login-inp-container">
                    <label htmlFor="rating">
                      <b>Rating</b>
                    </label>
                    <br />
                    <select
                      required
                      name="rating"
                      id="rating"
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="0">Select rating</option>
                      <option value="0">0 -- very worst</option>
                      <option value="1">1 -- worst</option>
                      <option value="2">2 -- ok</option>
                      <option value="3">3 -- average</option>
                      <option value="4">4 -- good</option>
                      <option value="5">5 -- Excellent</option>
                    </select>
                  </div>
                  <div className="login-inp-container">
                    <label htmlFor="comment">
                      <b>Comment</b>
                    </label>
                    <br />
                    <textarea
                      required
                      rows="5"
                      cols="20"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <Button
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    type="submit"
                    variant="dark"
                    disabled={loadingReview ? true : false}
                  >
                    {loadingReview ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              ) : (
                <Error variant="warning">Login to give review</Error>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
