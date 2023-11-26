import {styled} from "@mui/material/styles";
import {ContentWidthDesktop, InsideWidthDesktop} from "../../../util/util";
import {useNavigate} from "react-router-dom";


export default function MainHeader() {
  const navigate = useNavigate();

  function HandleStoreClick() {
    navigate('/store')
  }

  function HandleHomeClick() {
    navigate('/')
  }

  function HandleLogin() {
    navigate('/login')
  }

  function HandleSignUp() {
    navigate('/signup')
  }

  return (
    <Base>
      <Outside/>
      <Inside>
        <Side>
          <HomeTitle onClick={HandleHomeClick}>EasyA</HomeTitle>
        </Side>
        <Center>
          <MenuItem onClick={HandleStoreClick}>Buy&Sell</MenuItem>
        </Center>
        <Side>
          <MenuItem onClick={HandleLogin}>Login</MenuItem>
          <MenuItem onClick={HandleSignUp}>Sign up</MenuItem>
        </Side>
      </Inside>
      <Outside/>
    </Base>
  )
}

const Base = styled('div')({
  display:'flex',
  flex: '0 0 7rem',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  alignItems:'center',
  paddingLeft:'2rem',
  paddingRight:'2rem',
  backgroundColor:'white',
});


const HomeTitle = styled('div')({
  display:'flex',
  justifyContent:'center',
  fontSize: '2rem',
  fontWeight: '700',
  marginLeft:'2rem',
  color: 'black',
  cursor:'pointer',
});

const MenuItem = styled('div')({
  display:'flex',
  fontSize: '1.6rem',
  fontWeight: '700',
  marginLeft:'2rem',
  alignItems:'flex-end',
  color: 'black',
  cursor:'pointer',
});

const Inside = styled('div')({
  display: 'flex',
  flex: `0 0 ${InsideWidthDesktop}`,
  '@media (max-width: 1200px)': {
    flex: '0 0 100%',
  },
});

const Center = styled('div')({
  display:'flex',
  flex: `0 0 ${ContentWidthDesktop}`,
  justifyContent:'flex-start',
});

const Side = styled('div')({
  flex:1,
  display:'flex',
  justifyContent:'flex-start',
});

const Outside = styled('div')({
  flex: 1
});
