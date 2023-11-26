import {styled} from "@mui/material/styles";
import {storePostAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";


export default function StoreItemBox({onClick, id}) {
  const storePost = useRecoilValue(storePostAtom(id))

  return(
    <Base onClick={onClick}>
      <ImageBox style={{ backgroundImage: `url(${storePost.img})` }}>
      </ImageBox>
      <Title>
        {storePost?.title}
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
  fontSize:'1.2rem',
  textAlign:'left',
});
