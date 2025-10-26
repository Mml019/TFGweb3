import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import NavBrand from "./NavBrand";

export default function MyNavbar({
  style = { backgroundColor: "#0065BD" },
  type = "user",
  items = [],
  nameBrand = "QuizPEB",
}) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={style}
      className="body-tertiary"
    >
      <Container>
        <NavBrand
          nameBrand={nameBrand}
          srcImg="/img/logoUib.png"
          width="100"
          height="30"
          alt="Logo de la Universidad"
        />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" as="ul">
            {items.length > 0
              ? items.map((item, index) => (
                  <NavItem as="li" key={index}>
                    <Nav.Link as={Link} to={item.path || "#"}>
                      {item.name}
                    </Nav.Link>
                  </NavItem>
                ))
              : null}
            {type === "admin" ? (
              <Navbar.Text className="justify-content-end">
                Eres Admin
              </Navbar.Text>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
