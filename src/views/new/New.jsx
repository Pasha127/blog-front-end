import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import {BsFillImageFill,BsPersonBoundingBox } from "react-icons/bs";

const NewBlogPost = (props) => {
 const baseURL = "http://localhost:3000"
    /*const baseURL = "https://odd-plum-sawfish-shoe.cyclic.app" */
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [readTime, setReadTime] = useState("");
  const [category, setCategory] = useState("Politics");
  const [avatarDataURL, setAvatarDataURL] = useState({});
  const [coverDataURL, setCoverDataURL] = useState({});

  const handleChange = useCallback((value) => {
    setText(value);
  });

const postAvatar = async (id) =>{ 
  let formData = new FormData()
  formData.append('image', avatar)
  const options = {
    method: 'POST',    
    body: formData
    };
    const baseEndpoint = `${baseURL}/blogPosts/images/${id}/avatar`
    try {    
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {           
        const data = await response.json() 
        console.log(data)       
     } else {
       alert('Error fetching in avatar upload')
     } 
    } catch (error) {
      console.log(error)
    }finally{console.log("3 submit-post");}
  }


const postCover = async (id) =>{
  let formData = new FormData()
  formData.append('image', coverPic)
  const options = {
    method: 'POST',          
    body: formData
    };
    const baseEndpoint = `${baseURL}/blogPosts/images/${id}/cover`
    try {    
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {           
        const data = await response.json() 
        console.log(data)       
     } else {
       alert('Error fetching in avatar upload')
     } 
    } catch (error) {
      console.log(error)
    }finally{console.log("3 submit-post");}
  }

const postPics = async (id) =>{
  await postAvatar(id);
  await postCover(id);  
}
const readAvatar = (e)=>{
  const file = e.target.files[0]
  setAvatar(file);
  let fileReader, isCancel = false;
      if (file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            setAvatarDataURL(result)
          }
        }
        fileReader.readAsDataURL(file);
      }
      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      }
}
const readCover = (e)=>{
  const file = e.target.files[0]
  setCoverPic(file);
  let fileReader, isCancel = false;
      if (file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            setCoverDataURL(result)
          }
        }
        fileReader.readAsDataURL(file);
      }
      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      }
}




 const postNewBlog = async (postObj) => {
    const options = {
      method: 'POST',
          headers: {"Content-Type": "application/json"       
          },
          body: JSON.stringify(postObj)
      };
      const baseEndpoint = `${baseURL}/blogPosts`
    /* console.log("1 submit-post")  */   
      try {
        /* console.log("2 submit-post",baseEndpoint) */        
        const response = await fetch(baseEndpoint, options);
        if (response.ok) {           
          const data = await response.json()
          console.log(data._id);
          await postPics(data._id)          
          alert('Successfully posted new article!')
       } else {
         alert('Error fetching results')
       } 
      } catch (error) {
        console.log(error)
      }finally{console.log("3 submit-post");}
    }








  const handleSubmit = (e) => {
    e.preventDefault()
    const postObj = {category,title, cover:"https://placekitten.com/600/600" ,readTime:{value: readTime, unit: "minute"},author:{name:author,avatar:"https://placekitten.com/60/60",email},content:text}
    console.log(postObj);
    postNewBlog(postObj);
  }



  return (
    <Container className="new-blog-container">      
      <Form className="mt-5">
        <Row className=" align-items-center">
          <div className="col-2 p-0 d-flex border rounded pic-space">
        <label className="uploaded-pic" htmlFor="avatarUploadBtn">{!avatar ? <BsPersonBoundingBox style={{fontSize: "25px", color: "gray", cursor: "pointer"}}></BsPersonBoundingBox>:<img className="uploaded-pic" src={avatarDataURL} alt="avatar"/>}</label>
                          <input type="file" className="d-none" id="avatarUploadBtn"
                          onChange={(e)=>{readAvatar(e)}}></input>
                          </div>
        <Form.Group controlId="blog-form" className="mt-1 ml-5 col-10">
          <Form.Label>Author</Form.Label>
          <Form.Control size="lg" placeholder="Author"onChange={(e)=>(setAuthor(e.target.value)/* ,console.log(author) */)} />
          <Form.Label>E-mail</Form.Label>
          <Form.Control size="lg" placeholder="E-mail"onChange={(e)=>(setEmail(e.target.value)/* ,console.log(author) */)} />
        </Form.Group>
        </Row>

        <Row className=" align-items-center">
          <div className="col-2 p-0 d-flex border rounded pic-space">
        <label className="uploaded-pic" htmlFor="coverUploadBtn">{!coverPic ? <BsFillImageFill style={{fontSize: "25px", color: "gray", cursor: "pointer"}}></BsFillImageFill>:<img className="uploaded-pic" src={coverDataURL} alt="avatar"/>}</label>
                          <input type="file" className="d-none" id="coverUploadBtn"
                          onChange={(e)=>{readCover(e)}}></input>
                          </div>
        <Form.Group controlId="blog-form" className="mt-3 ml-5 col-10">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title"onChange={(e)=>(setTitle(e.target.value)/* ,console.log(title) */)} />
        </Form.Group>
        </Row>                
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Read Time in Minutes</Form.Label>
          <Form.Control size="lg" placeholder="Read Time in Minutes" onChange={(e)=>(setReadTime(e.target.value)/* ,console.log(readTime) */)}/>
        </Form.Group>       
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select" onChange={(e)=>(setCategory(e.target.value)/* , console.log(e.target.value) */)}>
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
