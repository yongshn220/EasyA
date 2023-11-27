import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {verifyEmail} from "../../api/api";
import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import {COLOR} from "../../util/util";


export default function VerificationRequestPage() {
  const location = useLocation();
  const [verifyStatus, setVerifyStatus] = useState(0)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token && verifyStatus === 0) {
      console.log("Try verify")
      verifyEmail(token).then((res) => {
        console.log(res)
        if (res?.status_code === 200 || res?.status_code === 208)
          setVerifyStatus(200)
        else
          setVerifyStatus((prev) => (prev === 200)? 200 : 400)
      })
    }
    else {
      setVerifyStatus(400)
    }
  }, []);

  return (
    <HomeWrapper>
      <Base>
        <Content>
          <Title>Email Verification</Title>
          {
            (verifyStatus === 0) &&
            <>
              <SubTitle>Verifying your email...</SubTitle>
              <SubTitle> If it takes too long, please try again, or contact us.</SubTitle>
              <SubTitle style={{fontWeight:'600'}}>easyacsacc@gmail.com</SubTitle>
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
              <HomeButton>Home</HomeButton>
            </>
          }
        </Content>
      </Base>
    </HomeWrapper>
  );
}


const Base = styled('div')({
  display:'flex',
  flexDirection:'column',
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
  fontSize:'4rem',
  fontWeight:'600',
  marginTop:'2rem',
});

const SubTitle = styled('div')({
  fontSize:'1.6rem',
  marginTop:'2rem',
  marginBottom:'1rem',
});

const HomeButton = styled(Button)({
  backgroundColor: COLOR.mainYellow, // Use your theme color here
  color: 'white',
  padding: '10px 0',
  fontSize:'1.2rem',
  width:'15rem',
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow, // Darken color on hover
  },
});


