import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";

export default function NavBar() {
  const currentUser = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container>
        <Button
          id="openbtn"
          onClick={() => {
            //! fix shrinkage bug with REDUX
            //! if(!isOpen) {
              document.getElementById("mySidebar")!.style.width = "150px";
              let main = document.getElementById("main")!;
              main.style.marginLeft = "150px";
              main.style.width = `${main.offsetWidth - 150}px`;
              //! setIsOpen(true);
            //! }
          }}
        >
          &#9776;
        </Button>
        <Navbar.Brand href="#home">Corner Creek Creations</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
