import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container"


const Header = ({ title }) => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  )
};

export default Header;