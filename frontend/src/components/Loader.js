import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "50px",
        width: "50px",
        display: "block",
        margin: "auto",
      }}
    ></Spinner>
  );
};

export default Loader;
