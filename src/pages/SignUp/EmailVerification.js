import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import {COLOR} from "../../util/util";
import React from "react";


export default function EmailVerification({email, setIsSignedUp}) {

  function resetSignUp() {
    setIsSignedUp(false)
  }

  return (
    <Base>
      <Content>
        <Title>
          Please verify your email
        </Title>
        <BodyText>
          You're almost there! We sent an email to <br/>
          <span style={{fontWeight:'600', color:'black'}}>{email}</span>
        </BodyText>
        <BodyText>
          Just click on the link in that email to complete your signup. <br/>
          If you don't see it, you may need to <span style={{fontWeight:'600', color:'black'}}>check your spam</span> folder.
        </BodyText>
        <BodyText>
          Still can't find the email?
        </BodyText>
        <ResendButton>Resend Email</ResendButton>
        <Button onClick={resetSignUp} style={{color: 'black', fontSize:'1rem', marginTop:'1rem'}} onClick={resetSignUp} color="primary">
          Sign Up again
        </Button>
      </Content>
    </Base>
  )
}


const Base = styled('div')({
  display:'flex',
  justifyContent:'center',
  width: '100%',
});

const Content = styled('div')({
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  width:'80%',
  textAlign: 'center',
  marginTop:'5rem',
  padding:'3rem',
  borderRadius:'5px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor:'white',
});

const Title = styled('div')({
  fontSize:'3rem',
  fontWeight:'600',
  marginBottom:'2rem',
});

const BodyText = styled('div')({
  fontSize:'1.6rem',
  marginBottom:'2rem',
  padding:'0.5rem',
  color: "#3a3a3a",
});

const ResendButton = styled(Button)({
  backgroundColor: COLOR.mainYellow, // Use your theme color here
  color: 'white',
  padding: '10px 0',
  fontSize:'1.2rem',
  width:'15rem',
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow, // Darken color on hover
  },
});

