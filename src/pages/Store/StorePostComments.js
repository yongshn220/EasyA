import CreateComment from "./CreateComment";
import Comment from "./Comment";
import * as React from "react";
import {styled} from "@mui/material/styles";


export default function StorePostComments({post}) {
  return (
    <>
      <CreateComment postId={post.id}/>
      <CommentArea>
        {
          post.comments.map((comment, index) => (
            <Comment key={index} postId={post.id} comment={comment}/>
          ))
        }
      </CommentArea>
    </>
  )
}



const CommentArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  marginTop:'2rem',
  width:'100%',
  borderRadius:'5px',
  backgroundColor:'white'
});
