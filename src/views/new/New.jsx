import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [avatar, setAvatar] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [readTime, setReadTime] = useState("");
  const [category, setCategory] = useState("Politics");
  const handleChange = useCallback((value) => {
    setText(value);
    console.log(value);
  });

 const postNewBlog = (postObj) => {
    const options = {
      method: 'POST',
          headers: {"Content-Type": "application/json"       
          },
          body: JSON.stringify(postObj)
      };
      const baseEndpoint = `http://localhost:3001/blogPosts`
    console.log("1 submit-post-think")    
      try {
        console.log("2 submit-post-thank",baseEndpoint)        
        const response = fetch(baseEndpoint, options);
        /* if (response.ok) { 
          alert('Successfully posted new article!')
        } else {
          alert('Error fetching results')
        } */
      } catch (error) {
        console.log(error)
      }finally{console.log("3 submit-post-thunk");}
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    const postObj = {category,title, cover:coverPic ,readTime:{value: readTime, unit: "minutes"},author:{name:author,avatar},content:text}
    console.log(postObj);
    postNewBlog(postObj);
  }



  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title" onChange={(e)=>(setTitle(e.target.value),console.log(title))} />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control size="lg" placeholder="Author"onChange={(e)=>(setAuthor(e.target.value),console.log(author))} />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author Avatar URL</Form.Label>
          <Form.Control size="lg" placeholder="Author Avatar URL" onChange={(e)=>(setAvatar(e.target.value),console.log(avatar))}/>
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover photo URL</Form.Label>
          <Form.Control size="lg" placeholder="Cover photo URL" onChange={(e)=>(setCoverPic(e.target.value),console.log(coverPic))}/>
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Read Time in Minutes</Form.Label>
          <Form.Control size="lg" placeholder="Read Time in Minutes" onChange={(e)=>(setReadTime(e.target.value),console.log(readTime))}/>
        </Form.Group>       
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select" onChange={(e)=>(/* setCategory(e.target.value), */console.log(e.target.value))}>
            <option>Politics</option>
            <option>Current Events</option>
            <option>Mystery</option>
            <option>Science</option>
            <option>Sports</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            value={text}
            onChange={handleChange}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
