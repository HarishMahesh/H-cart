import React, { useEffect } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct, listProducts } from "../actions/productActions";
import Error from "../components/Error";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  let { error, loading, products } = productList;
  let user = useSelector((state) => state.user);
  let { userInfo } = user;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container style={{ overflowX: "auto" }}>
      <div
        style={{
          margin: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>PRODUCTS</h5>
        <Button variant="dark" onClick={() => navigate(`/admin/products/new`)}>
          + New Product
        </Button>
      </div>
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
            <th>Price</th>
            <th>Brand</th>
            <th>Category</th>
            <th></th>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {products.map((u) => (
              <tr key={u._id}>
                <td>{u._id}</td>
                <td>{u.name}</td>
                <td>{u.price}</td>
                <td>{u.brand}</td>
                <td>{u.category}</td>
                <td>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/admin/products/${u._id}`)}
                    >
                      <i class="fas fa-user-edit"></i>
                    </Button>
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        dispatch(deleteProduct(u._id, userInfo.token))
                      }
                    >
                      <i class="fas fa-trash-alt"></i>
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

export default ProductList;
