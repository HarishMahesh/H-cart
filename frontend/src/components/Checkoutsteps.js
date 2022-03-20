import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkoutsteps.css";

const Checkoutsteps = ({ signin, shipping, payment, placeorder }) => {
  const navigate = useNavigate();
  return (
    <div className="checkoutsteps-container">
      <div>
        {signin ? (
          <span
            onClick={() => navigate("/signin?redirect=shipping/")}
            className="checkoutsteps-container-active"
          >
            Signin
          </span>
        ) : (
          <span className="checkoutsteps-container-inactive">Signin</span>
        )}
      </div>
      <div>
        {shipping ? (
          <span
            onClick={() => navigate("/shipping")}
            className="checkoutsteps-container-active"
          >
            Shipping
          </span>
        ) : (
          <span className="checkoutsteps-container-inactive">Shipping</span>
        )}
      </div>
      <div>
        {payment ? (
          <span
            onClick={() => navigate("/payment")}
            className="checkoutsteps-container-active"
          >
            Payment
          </span>
        ) : (
          <span className="checkoutsteps-container-inactive">Payment</span>
        )}
      </div>
      <div>
        {placeorder ? (
          <span
            onClick={() => navigate("/placeorder")}
            className="checkoutsteps-container-active"
          >
            Place Order
          </span>
        ) : (
          <span className="checkoutsteps-container-inactive">Place Order</span>
        )}
      </div>
    </div>
  );
};

export default Checkoutsteps;
