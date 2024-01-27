import {styled} from "@mui/material/styles";
import {COLOR, ContentWidthDesktop, InsideWidthDesktop} from "../../../util/util";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import PopupMessage from "../../../components/PopupMessage";
import {popupMessageAtom} from "../../../0.Recoil/utilState";
import MainHeaderOptions from "./MainHeaderOptions";


export default function MainHeader() {
  const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtom)
  const navigate = useNavigate();

  function HandleStoreClick() { navigate('/store') }
  function HandleHomeClick() { navigate('/') }

  return (
    <Base>
      <PopupMessage state={popupMessage.state} setState={(state) => setPopupMessage({...popupMessage, state: state})} message={popupMessage.message} severity={popupMessage.severity}/>
      <Outside/>
      <Inside>
        <SideLeft>
          <HomeTitle onClick={HandleHomeClick}>Eazy<span style={{color:COLOR.main, fontWeight:'800'}}>A</span></HomeTitle>
        </SideLeft>
        <Center>
          {/*<div style={{display:'flex', flex: 1}}>*/}
          {/*  <MenuItem onClick={HandleStoreClick}>Buy&Sell</MenuItem>*/}
          {/*</div>*/}
          {/*<div style={{display:'flex'}}>*/}
          {/*  <MainHeaderOptions/>*/}
          {/*</div>*/}
        </Center>
        <SideRight>
        </SideRight>
      </Inside>
      <Outside/>
    </Base>
  )
}

const Base = styled('div')({
  position: 'fixed', // Add this line to make the header fixed
  top: 0, // Position the header at the top of the viewport
  left: 0, // Align the header to the left side of the viewport
  right: 0, // Align the header to the right side of the viewport
  zIndex: 1000, // Ensure the header is above other content
  height:'7rem',
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
  fontSize: '2.4rem',
  fontWeight: '700',
  marginLeft:'2rem',
  color: 'black',
  cursor:'pointer',
});

const MenuItem = styled('div')({
  display:'flex',
  fontSize: '1.8rem',
  fontWeight: '700',
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
  paddingLeft:'2rem',
  paddingRight:'2rem',
  boxSizing: 'border-box',
  '@media (max-width: 1200px)': {
    justifyContent:'space-between',
    flex: 1,
  },
});

const SideLeft = styled('div')({
  flex:1,
  display:'flex',
  justifyContent:'flex-start',
  '@media (max-width: 1200px)': {
    flex: 0.2,
    justifyContent:'flex-start',
  },
});

const SideRight = styled('div')({
  position:'relative',
  display:'flex',
  flex:1,
  justifyContent:'flex-start',
  '@media (max-width: 1200px)': {
    flex: 0,
  },
});

const Outside = styled('div')({
  flex: 1
});
