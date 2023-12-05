import {styled} from "@mui/material/styles";
import {ContentWidthDesktop, InsideWidthDesktop} from "../../../util/util";
import {useNavigate} from "react-router-dom";
import {authAtom, userAtom} from "../../../0.Recoil/accountState";
import {useRecoilState, useRecoilValue} from "recoil";
import AvatarMenu from "./AvatarMenu";
import PopupMessage from "../../../components/PopupMessage";
import {popupMessageAtom} from "../../../0.Recoil/utilState";

export default function MainHeader() {
  const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtom)
  const auth = useRecoilValue(authAtom)
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

  return (
    <Base>
      <PopupMessage state={popupMessage.state} setState={(state) => setPopupMessage({...popupMessage, state: state})} message={popupMessage.message} severity={popupMessage.severity}/>
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
            (auth.loggedIn === false) &&
            <>
              <MenuItem onClick={HandleLogin}>Login</MenuItem>
              <MenuItem onClick={HandleSignUp}>Sign up</MenuItem>
            </>
          }
          {
            auth.loggedIn && <AvatarMenu user={user}/>
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
