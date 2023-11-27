import {styled} from "@mui/material/styles";
import {ContentWidthDesktop, InsideWidthDesktop, COLOR} from "../../../util/util";
import Avatar from '@mui/material/Avatar';
import {useNavigate} from "react-router-dom";
import {userAtom} from "../../../0.Recoil/accountState";
import {useRecoilValue} from "recoil";

export default function MainHeader() {
  const user = useRecoilValue(userAtom);
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

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: COLOR.mainYellow,
      },
      children: `${name.split(' ')[0][0]}`,
    };
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
          {
            (user.loggedIn === false) &&
            <>
              <MenuItem onClick={HandleLogin}>Login</MenuItem>
              <MenuItem onClick={HandleSignUp}>Sign up</MenuItem>
            </>
          }
          {
            user.loggedIn && <Avatar {...stringAvatar(user?.email?.toUpperCase())} />
          }
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
  alignItems:'center',
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
  alignItems:'center',
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
