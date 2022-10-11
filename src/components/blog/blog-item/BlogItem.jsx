import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
 
  
  const { title, cover, author, _id } = props;
  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={`https://res.cloudinary.com/dirwjcohx/image/upload/v1665498604/BlogPics/d4y4rdzdtheewqydifw2.png`} className="blog-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <BlogAuthor name={author.name} _id={_id} />
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
