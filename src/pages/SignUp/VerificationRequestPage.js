import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {verifyEmail} from "../../api/accountAPI";
import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import {COLOR} from "../../util/util";


export default function VerificationRequestPage() {
  const location = useLocation();
  const [verifyStatus, setVerifyStatus] = useState(0)
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  function handleVerifyButtonClick() {
    if (!token) {
      setVerifyStatus(400)
      return;
    }
    if (verifyStatus === 0) {
      verifyEmail(token).then((res) => {
        if (res?.status_code === 200 || res?.status_code === 208)
          setVerifyStatus(200)
        else
          setVerifyStatus((prev) => (prev === 200)? 200 : 400)
      })
    }
  }

  function handleHomeButtonClick() {
    navigate('/login')
  }

  return (
    <HomeWrapper>
      <Base>
        <Content>
          <Title>Email Verification</Title>
          {
            (verifyStatus === 0) &&
            <>
              <SubTitle> Click below button to verify your Email.</SubTitle>
              <VerifyEmailButton onClick={handleVerifyButtonClick}>Verify Email</VerifyEmailButton>
              <Text> If it not works, please contact us.</Text>
              <Text style={{fontWeight:'600'}}>easyacsacc@gmail.com</Text>
            </>
          }
          {
            (verifyStatus === 400) &&
            <>
              <SubTitle> Verification token is <span style={{fontWeight:'600'}}>not valid</span> . </SubTitle>
              <SubTitle> If it keeps fail, please contact us.</SubTitle>
              <SubTitle style={{fontWeight:'600'}}>easyacsacc@gmail.com</SubTitle>
            </>
          }
          {
            (verifyStatus === 200) &&
            <>
              <SubTitle style={{paddingBottom:'1rem'}}> Your email has been verified <span style={{fontWeight:'600'}}>Successfully</span>! </SubTitle>
              <HomeButton onClick={handleHomeButtonClick}>Login</HomeButton>
            </>
          }
        </Content>
      </Base>
    </HomeWrapper>
  );
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
  width:'50%',
  textAlign: 'center',
  marginTop:'5rem',
  padding:'3rem',
  borderRadius:'5px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor:'white',
});

const Title = styled('div')({
  fontSize:'4rem',
  fontWeight:'600',
  marginTop:'2rem',
  marginBottom:'1rem',
});

const SubTitle = styled('div')({
  fontSize:'1.6rem',
  marginTop:'2rem',
});

const Text = styled('div')({
  fontSize:'1.2rem',
  marginTop:'0.5rem',
  color: COLOR.fontGray50,
});

const HomeButton = styled(Button)({
  backgroundColor: COLOR.main, // Use your theme color here
  color: 'white',
  padding: '10px 0',
  fontSize:'1.2rem',
  width:'15rem',
  '&:hover': {
    backgroundColor: COLOR.mainLight, // Darken color on hover
  },
});

const VerifyEmailButton = styled(Button)({
  backgroundColor: COLOR.main, // Use your theme color here
  color: 'white',
  padding: '10px 0',
  fontSize:'1.2rem',
  marginTop:'2rem',
  marginBottom:'2rem',
  width:'20rem',
  '&:hover': {
    backgroundColor: COLOR.mainLight, // Darken color on hover
  },
});
