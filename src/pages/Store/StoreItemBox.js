import {styled} from "@mui/material/styles";
import {storePostAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";


export default function StoreItemBox({onClick, id}) {
  const post = useRecoilValue(storePostAtom(id))

  if (!post) return <></>

  console.log(post)

  return(
    <Base onClick={onClick}>
      <ImageBox style={{ backgroundImage: `url(${post.images[0]})` }}>
      </ImageBox>
      <Title>{post?.title}</Title>
      <Price>${post?.price}</Price>
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
  backgroundColor:'#5e5e5e',
  backgroundPosition: 'center', // Center the image
  backgroundRepeat: 'no-repeat', // Do not repeat the image
  backgroundSize: 'auto 100%', // Adjusts the size to maintain aspect ratio
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
