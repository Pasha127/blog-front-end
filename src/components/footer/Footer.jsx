import React from "react";
import { Container } from "react-bootstrap";

const Footer = (props) => {
  const baseURL = "http://localhost:3000"
  return (
    <footer
      style={{
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      <Container className="d-flex justify-content-between" >
        <div>{`${new Date().getFullYear()} - © Strive School | Developed for homework projects.`}</div>
        <a href={`${baseURL}/blogPosts/csv`}><p>List of Authors</p></a>
        </Container>
    </footer>
  );
};

export default Footer;
