import React, { useState } from 'react';
import {TextField, Button, Alert} from '@mui/material';
import { styled } from '@mui/material/styles';
import Autocomplete from "@mui/material/Autocomplete";
import {useNavigate} from "react-router-dom";
import {COLOR} from "../../util/util";
import {signup} from "../../api/accountAPI";
import {Majors} from "../../0.Recoil/easyAState";


export default function SignUpContent({setIsSignedUp, setFinalEmail}) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [major, setMajor] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  function goToLogin() {
    navigate('/login')
  }
  const validateEmail = (email) => {
    return email.endsWith('@stonybrook.edu');
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setEmailError(false)
    setPasswordError(false)
    setPasswordConfirmError(false)

    if (!validateEmail(email)) {
      setEmailError(true)
      return
    }

    if (!validatePassword(password)) {
      setPasswordError(true);
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError(true)
      return;
    }

    signup(email, password, major).then((res) => {
      if (res.status_code === 200) {
        setIsSignedUp(true)
        setFinalEmail(email)
      }
      else if (res.status_code === 208) {
        alert("You already have an account.")
      }
      else {
        alert("Unexpected error occurs. please contact us. easyacsacc@gmail.com")
      }
    })
  };

  return (
    <Base>
      <Content>
        <Title>Welcome to EasyA</Title>
        <SubTitle>Sign in with the university email.</SubTitle>
        <TextField
          fullWidth
          label="SBU Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& .MuiInputBase-input': { fontSize: '1.6rem' },
          }}
        />
        { emailError && <Alert severity="warning" sx={{fontSize: '1rem'}}>Email should be ends with @stonybrook.edu</Alert>}
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            '& .MuiInputBase-input': { fontSize: '1.6rem' },
          }}
        />
        { passwordError && <Alert severity="warning" sx={{fontSize: '1rem', textAlign: 'left'}}>Password should be more than 6 characters <br/>(alphabets + numbers + special characters)</Alert>}
        <TextField
          fullWidth
          label="Password Confirm"
          type="password"
          margin="normal"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          sx={{
            '& .MuiInputBase-input': { fontSize: '1.6rem' },
          }}
        />
        { passwordConfirmError && <Alert severity="warning" sx={{fontSize: '1rem'}}>Password is not matched</Alert>}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Majors}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Major" margin="normal"/>
          )}
          onInputChange={(event, newInputValue) => {
            setMajor(newInputValue);
          }}
          sx={{
            '& .MuiInputBase-input': { fontSize: '1.6rem' },
          }}
        />
        <SignUpButton fullWidth onClick={handleSignUp}>
          Sign Up
        </SignUpButton>
        <Button style={{color: COLOR.main, fontSize:'1rem', marginTop:'1rem'}} onClick={goToLogin} color="primary">
          Already have an account? Log In
        </Button>
      </Content>
    </Base>
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
});

const SubTitle = styled('div')({
  fontSize:'1.6rem',
  marginBottom:'1rem',
});


const SignUpButton = styled(Button)({
  backgroundColor: COLOR.main, // Use your theme color here
  color: 'white',
  padding: '10px 0',
  fontSize:'1.2rem',
  marginTop: '16px',
  '&:hover': {
    backgroundColor: COLOR.mainLight, // Darken color on hover
  },
});
