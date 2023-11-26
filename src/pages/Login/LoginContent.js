import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {COLOR} from "../../util/util";


export default function LoginContent() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(username, password);
  };

  function goToSignUp() {
    navigate('/signup')
  }

  return (
    <Base>
      <Content>
        <Title>
          Welcome to EasyA
        </Title>
        <SubTitle>
          Login in to your account with university email.
        </SubTitle>
        <TextField
          fullWidth
          label="SBU Email"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            '& .MuiInputBase-input': { fontSize: '1.6rem' },
          }}
        />
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

        <LoginButton fullWidth onClick={handleLogin}>
          Log In
        </LoginButton>

        <Button onClick={goToSignUp} color="primary">
          Don't have an account? Sign up
        </Button>
      </Content>
    </Base>
  );
}

const Base = styled('div')({
  display:'flex',
  justifyContent:'center',
  width: '100%',
  height: '100%',
  backgroundColor:'white',
});

const Content = styled('div')({
  display:'flex',
  flexDirection:'column',
  maxWidth:'400px',
  textAlign: 'center',
  marginTop:'5rem',
});

const Title = styled('div')({
  fontSize:'4rem',
  fontWeight:'600',
});

const SubTitle = styled('div')({
  fontSize:'1.6rem',
  marginBottom:'1rem',
});


const LoginButton = styled(Button)({
  backgroundColor: COLOR.mainYellow, // Use your theme color here
  color: 'white',
  padding: '10px 0',
  marginTop: '16px',
  fontSize:'1.2rem',
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow, // Darken color on hover
  },
});

