import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
  const { name, _id } = props;
  return (
    <Row>
      <Col xs={2}>
        <Image className="blog-author" src={`https://res.cloudinary.com/dirwjcohx/image/upload/v1665498604/BlogPics/d4y4rdzdtheewqydifw2.png`} roundedCircle />
      </Col>
      <Col>
        <div>by</div>
        <h6>{name}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
