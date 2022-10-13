import React, { useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import CommentSection from "./CommentSection/CommentSection";


import "./styles.css";
const Blog = (props) => {
  const baseURL = "http://localhost:3000"
  /* const baseURL = "https://odd-plum-sawfish-shoe.cyclic.app" */

  const fetchBlogPost = async (id) => {
    const options = {
      method: 'GET' ,
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',         
        } 
      };      
      const baseEndpoint = `${baseURL}/blogPosts/${id}`
      console.log("fetch blogs")
      const response = await fetch(baseEndpoint, options);        
       if (response.ok) {
        const data = await response.json()
        setBlog(data);
            /* console.log("blog:", data.readTime.value); */
          } else {
            alert('Error fetching results')
    } 
  }
  const downloadPDF = async (id) => {
    const options = {
      method: 'GET' ,
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',         
        } 
      };      
      const baseEndpoint = `${baseURL}/blogPosts/${id}/pdf`
      console.log("fetch blogs")
      const response = await fetch(baseEndpoint, options);        
       if (response.ok) {
        const data = await response.json()
        setBlog(data);
            /* console.log("blog:", data.readTime.value); */
          } else {
            alert('Error fetching results')
    } 
  }



  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const { id } = params;
    fetchBlogPost(id)   
    
  }, []);

useEffect(()=>{
  if (blog) {
    
    /* console.log("also", blog) */
    setLoading(false);
  } else {
    navigate("/404");
  }
}, [blog])


 if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        {blog && <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              {blog.readTime && <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div> }
              <div className="blogInteractionContainer"
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
                <a href={`${baseURL}/blogPosts/${params.id}/json`}>
                <Button
                 variant="outline-secondary"
                 
                 >Download PDF</Button></a>
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>}
        <CommentSection/>
      </div>
    );
  }
};

export default Blog;
