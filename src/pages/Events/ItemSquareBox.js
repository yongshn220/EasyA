import {styled} from "@mui/material/styles";


export default function ItemSquareBox() {
  return(
    <Base>
      <ImageBox/>
      <Title>
        Event Examplanation
      </Title>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex:1,
  padding:'0.5rem',
  backgroundColor:'white',
});

const ImageBox = styled('div')({
  width:'100%',
  aspectRatio: '1/1',
  marginBottom:'0.5rem',
  backgroundColor:'#c3e3fa',
});

const Title = styled('div')({
  fontSize:'1.2rem',
  textAlign:'left',
});
