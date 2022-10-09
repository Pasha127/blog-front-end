import React from "react";
import { Container, Row } from "react-bootstrap"
import comments from "../../../data/exampleComments.json"
import SingleComment from "./SingleComment"


const CommentSection =()=>{
    return(<>
    <Container>
        {comments.map(comment =>(
            <Row>
                <SingleComment comment={comment.comment} author={comment.author} />
            </Row>
        ) )}

    </Container>
    </>)
}
export default CommentSection;