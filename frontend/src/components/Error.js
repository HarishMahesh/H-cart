import React from "react";
import { Alert } from "react-bootstrap";

const Error = ({ children, variant }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Error;
