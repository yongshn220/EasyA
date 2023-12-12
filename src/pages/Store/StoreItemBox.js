import {styled} from "@mui/material/styles";
import {storePostAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";
import {useEffect, useState} from "react";

function truncateTitle(title, maxLength = 30) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...'; //
  }
  return title;
}

export default function StoreItemBox({onClick, id}) {
  const post = useRecoilValue(storePostAtom(id))
  const [imageSrc, setImageSrc] = useState(post.images.length > 0? post.images[0].lowRes : null);

  useEffect(() => {
    if (post.images.length <= 0) return

    const highResImage = new window.Image()
    highResImage.src = post.images[0].highRes;
    highResImage.onload = () => {
      setImageSrc(post.images[0].highRes)
    };
  }, [post.images]);

  if (!post) return <></>

  const truncatedTitle = truncateTitle(post?.title);

  return(
    <Base onClick={onClick}>
      <ImageBox>
        {
          imageSrc &&
          <Image src={imageSrc} alt="Description" loading="lazy" decoding="async"/>
        }
      </ImageBox>
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
  marginBottom: '2rem',
  cursor:'pointer',
});

const ImageBox = styled('div')({
  width: '100%',
  aspectRatio: '1/1',
  marginBottom: '0.5rem',
  borderRadius: '5px',
  overflow: 'hidden', // To maintain the border-radius
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

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
