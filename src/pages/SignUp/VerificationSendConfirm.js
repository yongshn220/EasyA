import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import {COLOR} from "../../util/util";
import React from "react";
import {resendVerificationEmail} from "../../api/api";
import {useNavigate} from "react-router-dom";


export default function VerificationSendConfirm({email, setIsSignedUp}) {
  const navigate = useNavigate()
  function resendEmail() {
    resendVerificationEmail(email).then((res) => {
      if (res.status_code === 200) {
        alert("Verification email has been sent again.")
      }
    })
  }

  function resetSignUp() {
    setIsSignedUp(false)
  }

  function gotoLogin() {
    navigate('/login')
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
        <ResendButton onClick={resendEmail} >Resend Email</ResendButton>
        <ResendButton style={{marginTop:'1rem',}} onClick={resetSignUp} >sign up again</ResendButton>
      </Content>
      <Content>
        <Title>
          Verified successfully?
        </Title>
        <LoginButton onClick={gotoLogin}>LOGIN</LoginButton>
      </Content>
    </Base>
  )
}


const Base = styled('div')({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
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
  color: COLOR.mainYellow,
  padding: '10px 0',
  fontSize:'1.2rem',
  width:'15rem',
  border: `1px solid ${COLOR.mainYellow}`,
  '&:hover': {
    backgroundColor:COLOR.mainLightYellow10
  },
});

const LoginButton = styled(Button)({
  backgroundColor: COLOR.mainYellow, // Use your theme color here
  color: 'white',
  padding: '10px 0',
  fontSize:'1.2rem',
  width:'15rem',
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow, // Darken color on hover
  },
});

