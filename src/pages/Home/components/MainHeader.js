import {styled} from "@mui/material/styles";
import {InsideWidthDesktop} from "../../../util/util";


export default function MainHeader() {
  return (
    <Base>
      <Outside/>
      <Inside>
        <HomeTitle>EasyA</HomeTitle>
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
  fontSize: '2rem',
  fontWeight: '700',
  marginLeft:'2rem',
  color: 'black'
});

const Inside = styled('div')({
  display: 'flex',
  flex: `0 0 ${InsideWidthDesktop}`,
  '@media (max-width: 1200px)': {
    flex: '0 0 100%',
  },
});

const Outside = styled('div')({
  flex: 1
});
