import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

const UsersList = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  let user = useSelector((state) => state.user);
  let { userInfo } = user;

  const getusers = async () => {
    setLoading(true);
    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      let { data } = await axios.get("/api/users/", config);
      setUserList(data);
      console.log(data);
      setLoading(false);
      setError();
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getusers();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container style={{ overflowX: "auto" }}>
      <h5 style={{ textAlign: "center", margin: "20px" }}>USERS</h5>

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
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {userList.map((u) => (
              <tr key={u._id}>
                <td>{u._id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/admin/users/${u._id}`)}
                    >
                      <i class="fas fa-user-edit"></i>
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

export default UsersList;
