import React, { useState } from 'react';
import {TextField, Button, Alert} from '@mui/material';
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {COLOR} from "../../util/util";
import {login} from "../../api/api";
import {useRecoilState} from "recoil";
import {userAtom} from "../../0.Recoil/accountState";


export default function LoginContent() {
  const [user, setUser] = useRecoilState(userAtom)
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFail, setLoginFail] = useState(false)

  if (user.loggedIn) {
    navigate('/')
  }

  function handleLogin(event) {
    event.preventDefault();
    login(email, password).then((res) => {
      if (res.status_code === 200) {
        const _user = {
          loggedIn: true,
          email: res.email,
          accessToken: res.access_token
        }
        setUser(_user)
        localStorage.setItem('user', JSON.stringify(_user))
        navigate('/')
      }
      else {
        setLoginFail(true)
      }
    })
  }

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
        { loginFail && <Alert severity="error" sx={{fontSize: '1rem'}}>Incorrect email or password.</Alert>}
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

        <Button style={{color: COLOR.mainYellow, fontSize:'1rem', marginTop:'1rem'}} onClick={goToSignUp} color="primary">
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

