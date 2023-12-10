import {styled} from "@mui/material/styles";
import {storePostAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";

export default function StoreItemBox({onClick, id}) {
  const post = useRecoilValue(storePostAtom(id))

  if (!post) return <></>

  function truncateTitle(title, maxLength = 30) {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...'; // Truncate and add ellipsis
    }
    return title;
  }

  const truncatedTitle = truncateTitle(post?.title);


  return(
    <Base onClick={onClick}>
      <ImageBox style={{ backgroundImage: `url(${post.images[0]})` }}/>
      <Title>{truncatedTitle}</Title>
      <Price>${post?.price}</Price>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: "0 0 15rem",
  padding:'0.5rem',
  cursor:'pointer',
});

const ImageBox = styled('div')({
  width:'100%',
  aspectRatio: '1/1',
  marginBottom:'0.5rem',
  borderRadius:'5px',
  backgroundColor:'#5e5e5e',
  backgroundPosition: 'center', // Center the image
  backgroundRepeat: 'no-repeat', // Do not repeat the image
  backgroundSize: 'auto 100%', // Adjusts the size to maintain aspect ratio
});

const Title = styled('div')({
  fontSize:'1.6rem',
  textAlign:'left',
  paddingLeft:'0.5rem',
  paddingRight:'0.5rem',
});

const Price = styled('div')({
  fontSize:'1.6rem',
  fontWeight:'600',
  textAlign:'left',
  paddingLeft:'0.5rem',
  paddingRight:'0.5rem',
});
