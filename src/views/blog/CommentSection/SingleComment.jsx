import React from "react";
import {Card} from 'react-bootstrap';
const SingleComment = (props)=>{  
    return(<>
    <Card>      
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {props.comment}
            {' '}
          </p>
          <footer className="blockquote-footer">
            {props.author} 
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
    </>)        
}
export default SingleComment;