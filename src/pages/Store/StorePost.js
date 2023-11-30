import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import Comment from "./Comment";
import {useParams} from "react-router-dom";
import {storePostAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";
import CreateComment from "./CreateComment";
import { useSwipeable } from 'react-swipeable';
import {useState} from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function StorePost() {
  const { _id } = useParams();
  const post = useRecoilValue(storePostAtom(_id))
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  if (!post) return <></>

  function nextImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  }

  function prevImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? post.images.length - 1 : prevIndex - 1))
  }

  function ImageDots({ length, currentIndex }) {
    return (
      <div style={{ textAlign: 'center' }}>
        {Array.from({ length }, (_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </div>
    );
  }

  return (
    <HomeWrapper>
      <Base>
        <Content {...handlers}>
          <ImageArea>
            <LeftButton onClick={prevImage}/>
            <ImageBox style={{ backgroundImage: `url(${post.images[currentImageIndex]})` }}/>
            <RightButton onClick={nextImage}/>
          </ImageArea>
          <ImageDots length={post.images.length} currentIndex={currentImageIndex} />
          <TextArea>{post.title}</TextArea>
          <TextArea>${post.price}</TextArea>
          <DescriptionArea>
            {post.description}
          </DescriptionArea>
        </Content>
        <CreateComment postId={post._id}/>
        <CommentArea>
          {
            post.comments.map(comment => (
              <Comment comment={comment}/>
            ))
          }
        </CommentArea>
      </Base>
    </HomeWrapper>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom:'2rem',
});

const Content = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  padding: '4rem',
  marginTop:'1rem',
  marginBottom: '2rem',
  alignItems: 'center',
  borderRadius: '5px',
  backgroundColor:'white',
});

const TextArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  height: '5rem',
  width:'100%',
  marginLeft: '1rem',
  fontSize: '2rem',
  fontWeight:'700',
  textAlign: 'left',
  justifyContent:'center',
});

const DescriptionArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  fontSize: '1.6rem',
  height: 'auto',
  width:'100%',
  marginLeft: '1rem',
  textAlign:'left',
  paddingTop:'2rem',
});

const CommentArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  marginTop:'2rem',
  width:'100%',
  borderRadius:'5px',
  backgroundColor:'white'
});

const ImageArea = styled('div')({
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  width:'100%',
});


const ImageBox = styled('div')({
  width: '100%',
  height: '40rem',
  marginBottom: '1rem',
  borderRadius:'5px',
  backgroundColor:'#2d2d2d',
  backgroundPosition: 'center', // Center the image
  backgroundRepeat: 'no-repeat', // Do not repeat the image
  backgroundSize: '100% auto', // Adjusts the size to maintain aspect ratio
});

const LeftButton = styled(KeyboardArrowLeftIcon)({
  position:'absolute',
  left:'0.5rem',
  fontSize:'3rem',
  cursor:'pointer'
});

const RightButton = styled(KeyboardArrowRightIcon)({
  position:'absolute',
  right:'0.5rem',
  fontSize:'3rem',
  cursor:'pointer'
});

const Dot = styled('div')(({ active }) => ({
  height: '0.8rem',
  width: '0.8rem',
  backgroundColor: active ? '#757575' : '#d5d5d5', // Active dot is darker
  borderRadius: '50%',
  display: 'inline-block',
  margin: '5px',
}));
