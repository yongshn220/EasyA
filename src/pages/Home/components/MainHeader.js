import {styled} from "@mui/material/styles";


export default function MainHeader() {
  return (
    <Base>
      <HomeTitle>EasyA</HomeTitle>
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
  color: 'white'
});


const HomeTitle = styled('div')({
  fontSize: '1.6rem',
  fontWeight: '700',
  color: 'black'
});
