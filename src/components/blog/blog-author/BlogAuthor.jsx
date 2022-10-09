import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
  const { name, _id } = props;
  return (
    <Row>
      <Col xs={2}>
        <Image className="blog-author" src={`http://localhost:3001/images/${_id}/cover`} roundedCircle />
      </Col>
      <Col>
        <div>by</div>
        <h6>{name}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
