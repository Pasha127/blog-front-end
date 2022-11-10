import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

import "react-quill/dist/quill.snow.css";
import "./styles.css";
import {BsFillImageFill,BsPersonBoundingBox } from "react-icons/bs";

const LogIn = (props) => {
 const baseURL = "http://localhost:3000"
    /*const baseURL = "https://odd-plum-sawfish-shoe.cyclic.app" */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarDataURL, setAvatarDataURL] = useState({});
  const [wantLogIn, setWantLogIn] = useState(true);

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

 const postNewAuthor = async (postObj) => {
    const options = {
      method: 'POST',
          headers: {"Content-Type": "application/json"       
          },
          body: JSON.stringify(postObj)
      };
      const baseEndpoint = `${baseURL}/authors`
    /* console.log("1 submit-post")  */   
      try {
        /* console.log("2 submit-post",baseEndpoint) */        
        const response = await fetch(baseEndpoint, options);
        if (response.ok) {           
          const data = await response.json()
          console.log(data._id);
          await postAvatar(data._id)          
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
    const postObj = {firstName,lastName,username,password,email}
    console.log(postObj);
    postNewAuthor(postObj);
  }



  return (
    <Container className="new-blog-container ">      
      {wantLogIn? 
      <div className="log-in-box">
        <Form>
        <Form.Group controlId="Username" className="mt-1 ml-5 col-10">
            <Form.Label>Username</Form.Label>
          <Form.Control size="lg" placeholder="Username"onChange={(e)=>(setUsername(e.target.value))} />
            </Form.Group>
            <Form.Group controlId="Password" className="mt-1 ml-5 col-10">
          <Form.Label>Password</Form.Label>
          <Form.Control size="lg" type="password" placeholder="Password"onChange={(e)=>(setPassword(e.target.value))} />
          </Form.Group> 
            <Form.Group className="mt-3 ml-5 col-10">
        <Button variant="outline-dark"
        onClick={(e) => handleSubmit(e)}
        type="submit"
        size="lg"
        style={{
          marginLeft: "1em",
        }}>
            Log-In
          </Button>
        <Button
            onClick={(e) => setWantLogIn(false)}
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Register
          </Button>
          </Form.Group>
        </Form>
      </div>
      
      
      :<Form className="mt-5">
        
          <div className="d-flex justify-content-center">
            <div className="col-2 p-0 d-flex border rounded pic-space">
        <label className="uploaded-pic" htmlFor="avatarUploadBtn">{!avatar ? <BsPersonBoundingBox style={{fontSize: "25px", color: "gray", cursor: "pointer"}}></BsPersonBoundingBox>:<img className="uploaded-pic" src={avatarDataURL} alt="avatar"/>}</label>
                          <input type="file" className="d-none" id="avatarUploadBtn"
                          onChange={(e)=>{readAvatar(e)}}></input>
                          </div>
                          </div>
        <Form.Group controlId="First-Name" className="mt-1 ml-5 col-10">
          <Form.Label>First Name</Form.Label>
          <Form.Control size="lg" placeholder="First Name"onChange={(e)=>(setFirstName(e.target.value))} />
        </Form.Group>         
        <Form.Group controlId="Last-Name" className="mt-1 ml-5 col-10">
          <Form.Label>Last Name</Form.Label>
          <Form.Control size="lg" placeholder="Last Name"onChange={(e)=>(setLastName(e.target.value))} />
        </Form.Group>         
        <Form.Group controlId="Username" className="mt-1 ml-5 col-10">
          <Form.Label>Username</Form.Label>
          <Form.Control size="lg" placeholder="Username"onChange={(e)=>(setUsername(e.target.value))} />
        </Form.Group>         
        <Form.Group controlId="Password" className="mt-1 ml-5 col-10">
          <Form.Label>Password</Form.Label>
          <Form.Control size="lg" type="password" placeholder="Password"onChange={(e)=>(setPassword(e.target.value))} />
          </Form.Group>         
        <Form.Group controlId="email" className="mt-1 ml-5 col-10">
          <Form.Label>E-mail</Form.Label>
          <Form.Control size="lg" placeholder="E-mail"onChange={(e)=>(setEmail(e.target.value))} />
          </Form.Group>         
        <Form.Group className="mt-3 ml-5 col-10">
        <Button type="reset" size="lg" variant="outline-dark" onClick={(e) => setWantLogIn(true)}>
        Back
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
            Register
          </Button>
          </Form.Group>         
      </Form>}
    </Container>
  );
};

export default LogIn;
