import React from "react";
import { Col, Row } from "react-bootstrap";
/* import posts from "../../../data/posts.json"; */
import BlogItem from "../blog-item/BlogItem";
import { useState } from "react"
import { useEffect } from "react"

const BlogList = (props) => {
  const baseURL = "http://localhost:3000"
  /* const baseURL = "https://odd-plum-sawfish-shoe.cyclic.app" */
  const [blogs, setBlogs] = useState([]);
  
  const fetchBlogPosts = async () => {
    const options = {
      method: 'GET' ,
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',         
        } 
      };      
      const baseEndpoint = `${baseURL}/blogPosts`
      /* console.log("fetch blogs") */
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {
        const data = await response.json()
        setBlogs(data)
            /* console.log("blogs:", data); */
          } else {
            alert('Error fetching results')
    }
  }
  
  useEffect(() => {
        fetchBlogPosts()
     }, [])

  return (
    <Row>
      {blogs.length > 0 && blogs.map((post,i) => (
        <Col
          key={post.title+i}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem  {...post}>{/* console.log(post.title, i) */}</BlogItem>
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
