import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userstate = useSelector((state) => state.user);
  let { userInfo } = userstate;
  const navigate = useNavigate();

  const logoutHandeler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className="header">
          <Navbar.Brand className="header-name" onClick={() => navigate("/")}>
            H-CART
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto header-options">
              <Nav.Link onClick={() => navigate("/cart")}>
                <i class="fas fa-shopping-cart"></i> CART
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandeler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={() => navigate("/signin")}>
                  <i class="fas fa-user"></i> SIGN IN
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin Menu">
                  <NavDropdown.Item onClick={() => navigate("/admin/users")}>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/admin/products")}>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/admin/orders")}>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
