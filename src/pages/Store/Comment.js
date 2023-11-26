import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";


export default function Comment({comment}) {
  return (
    <Base>
      <User>{comment.username}</User>
      <Text>{comment.text}</Text>
      <Reply>Reply</Reply>
      {
        comment.replies.map(reply => (
          <InnerBase>
            <User>{reply.username}</User>
            <Text>{reply.text}</Text>
          </InnerBase>
        ))
      }
    </Base>
  )
}

const Base = styled('div')({
  display:'flex',
  flexDirection:'column',
  paddingLeft:'1rem',
  justifyContent:'center',
  paddingTop:'1rem',
  paddingBottom:'1rem',
  borderBottom: `0.5px solid ${COLOR.lineGray}`,
  backgroundColor:'white',
});

const InnerBase = styled('div')({
  display:'flex',
  flexDirection:'column',
  paddingLeft:'1rem',
  justifyContent:'center',
  marginTop:'1rem',
  paddingTop:'1rem',
  borderLeft: `2px solid ${COLOR.lineGray}`,
  backgroundColor:'white',
});

const User = styled('div')({
  fontSize: '1.6rem',
  fontWeight:'700',
  textAlign:'left',
});

const Text = styled('div')({
  fontSize: '1.6rem',
  textAlign:'left',
  paddingTop:'1rem',
  paddingBottom:'1rem',
  color: 'black',
  marginTop:'0.5rem',
})

const Reply = styled('div')({
  fontSize: '1.2rem',
  fontWeight:'800',
  textAlign:'left',
  color: COLOR.fontGray50,
  marginTop:'0.5rem',
})
