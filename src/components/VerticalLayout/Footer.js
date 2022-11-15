import React from "react";
import { Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <div className="col-12">
              © {new Date().getFullYear()} INNOPOLIS.
            </div>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
