import {styled} from "@mui/material/styles";
import {storePostAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";
import {useNavigate} from "react-router-dom";


export default function StoreItemBox({onClick, id}) {
  const storePost = useRecoilValue(storePostAtom(id))

  return(
    <Base onClick={onClick}>
      <ImageBox style={{ backgroundImage: `url(${storePost.img})` }}>
      </ImageBox>
      <Title>{storePost?.title}</Title>
      <Price>${storePost?.price}</Price>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex:1,
  padding:'0.5rem',
  backgroundColor:'white',
  cursor:'pointer',
});

const ImageBox = styled('div')({
  width:'100%',
  aspectRatio: '1/1',
  marginBottom:'0.5rem',
  backgroundColor:'#c3e3fa',
  backgroundPosition: 'center', // Center the image
  backgroundRepeat: 'no-repeat', // Do not repeat the image
});

const Title = styled('div')({
  fontSize:'1.6rem',
  textAlign:'left',
});

const Price = styled('div')({
  fontSize:'1.6rem',
  fontWeight:'600',
  textAlign:'left',
});
