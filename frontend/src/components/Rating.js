import React from "react";
import "./Rating.css";

const Rating = ({ rate, text }) => {
  return (
    <div className="rating">
      <span className="rating-star">
        {rate >= 1 ? (
          <i class="fas fa-star"></i>
        ) : rate >= 0.5 ? (
          <i class="fas fa-star-half-alt"></i>
        ) : (
          <i class="far fa-star"></i>
        )}
      </span>
      <span className="rating-star">
        {rate >= 2 ? (
          <i class="fas fa-star"></i>
        ) : rate >= 1.5 ? (
          <i class="fas fa-star-half-alt"></i>
        ) : (
          <i class="far fa-star"></i>
        )}
      </span>
      <span className="rating-star">
        {rate >= 3 ? (
          <i class="fas fa-star"></i>
        ) : rate >= 2.5 ? (
          <i class="fas fa-star-half-alt"></i>
        ) : (
          <i class="far fa-star"></i>
        )}
      </span>
      <span className="rating-star">
        {rate >= 4 ? (
          <i class="fas fa-star"></i>
        ) : rate >= 3.5 ? (
          <i class="fas fa-star-half-alt"></i>
        ) : (
          <i class="far fa-star"></i>
        )}
      </span>
      <span className="rating-star">
        {rate >= 5 ? (
          <i class="fas fa-star"></i>
        ) : rate >= 4.5 ? (
          <i class="fas fa-star-half-alt"></i>
        ) : (
          <i class="far fa-star"></i>
        )}
      </span>
      {text && <span>{text}</span>}
    </div>
  );
};

export default Rating;
