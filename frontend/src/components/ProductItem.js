import React from "react";
import "./ProductItem.css";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="productItem-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="productItem-img-container">
        <img src={product.image} alt={product.name}></img>
      </div>
      <div className="productItem-textarea">
        <p>
          <b>{product.name}</b>
        </p>
        <Rating rate={product.rating} text={` ${product.numReviews} Reviews`} />
        <h5>{`₹ ${product.price}`}</h5>
      </div>
    </div>
  );
};

export default ProductItem;
