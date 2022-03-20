import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

const OrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  let user = useSelector((state) => state.user);
  let { userInfo } = user;

  const getOrders = async () => {
    setLoading(true);
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      let { data } = await axios.get("/api/orders/", config);
      setOrderList(data);
      setLoading(false);
      setError();
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getOrders();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container style={{ overflowX: "auto" }}>
      <h5 style={{ textAlign: "center", margin: "20px" }}>ORDERS</h5>

      {loading && (
        <Spinner
          style={{ display: "block", margin: "auto" }}
          animation="border"
        />
      )}
      {error && <Error variant="danger">{error}</Error>}

      {!loading && !error && (
        <Table striped bordered hover size="sm">
          <thead style={{ textAlign: "center" }}>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th></th>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {orderList.map((u) => (
              <tr key={u._id}>
                <td>{u._id}</td>
                <td>{u.user.name}</td>
                <td>{u.createdAt.slice(0, 10)}</td>
                <td>{u.totalPrice + " ₹"}</td>
                <td>{u.isPaid ? u.paidAt.slice(0, 10) : "No"}</td>
                <td>{u.isDelivered ? u.deliveredAt.slice(0, 10) : "No"}</td>
                <td>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/orders/${u._id}`)}
                    >
                      Details
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tbody></tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderList;
