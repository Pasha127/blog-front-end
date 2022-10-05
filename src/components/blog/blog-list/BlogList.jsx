import React from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { useState } from "react"
import { useEffect } from "react"

const BlogList = (props) => {
  const [authors, setAuthors] = useState([]);
  
  const fetchAuthors = async () => {
    const options = {
      method: 'GET' ,
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',         
        } 
      };      
      const baseEndpoint = `http://localhost:3001/authors`
      console.log("fetch authors")
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {
        const data = await response.json()
        setAuthors(data)
            console.log("authors:", data);
          } else {
            alert('Error fetching results')
    }
  }
  
  useEffect(() => {
        fetchAuthors()
     }, [])

  return (
    <Row>
      {posts.map((post,i) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title+i} {...post}>{console.log(post.title, i)}</BlogItem>
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
