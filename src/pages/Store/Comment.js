import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";


export default function Comment() {
  return (
    <Base>
      <User>#1</User>
      <Text>hello This is a sample comment. This is a sample Comment.</Text>
      <Reply>Reply</Reply>
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
