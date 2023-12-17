import {styled} from "@mui/material/styles";
import {storePostAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

function truncateTitle(title, maxLength = 30) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...'; //
  }
  return title;
}


export default function StoreItemBox({onClick, id}) {
  const post = useRecoilValue(storePostAtom(id))
  if (!post) return <></>

  const truncatedTitle = truncateTitle(post?.title);

  return(
    <Base onClick={onClick}>
      <ImageBox>
        <Image src={post?.images[0]?.lowRes } alt="Description" loading="lazy" decoding="async" />
      </ImageBox>
      <ContentBox>
        <Title>{truncatedTitle}</Title>
        <Flex>
          <Price style={{flex:1}}>${post?.price}</Price>
          <Feedback>
            <FeedbackItem>
              <ThumbUpOffAltIcon sx={{fontSize:'1.8rem'}}/>
              <span style={{fontSize:'1.4rem', fontWeight:'600'}}>5</span>
            </FeedbackItem>
            <FeedbackItem style={{display:'flex', alignItems:'center'}}>
              <ChatBubbleOutlineIcon sx={{fontSize:'1.8rem'}}/>
              <span style={{fontSize:'1.4rem', fontWeight:'600'}}>5</span>
            </FeedbackItem>
          </Feedback>
        </Flex>
      </ContentBox>
    </Base>
  )
}


const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap:'1rem',
  padding:'0.5rem',
  marginBottom: '2rem',
  cursor:'pointer',
});

const ImageBox = styled('div')({
  width: '100%',
  aspectRatio: '1/0.8',
  borderRadius: '5px',
  overflow: 'hidden', // To maintain the border-radius
});

const ContentBox = styled('div')({
  display:'flex',
  flexDirection:'column',
  marginLeft:'1rem',
  marginRight:'1rem',
  gap:'1rem',
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

const Title = styled('div')({
  fontSize:'1.6rem',
  textAlign:'left',
});

const Flex = styled('div')({
  display:'flex',
});

const Price = styled('div')({
  fontSize:'2rem',
  fontWeight:'600',
  textAlign:'left',
});

const Feedback = styled('div')({
  display:'flex',
  flex:0,
  alignItems:'center',
  gap:'1rem'
})

const FeedbackItem = styled('div')({
  display:'flex',
  alignItems:'center'
})
