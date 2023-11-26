import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {Checkbox, Input} from "@mui/material";
import {COLOR} from "../../util/util";
import Comment from "./Comment";
import {useParams} from "react-router-dom";
import {storePostAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";
import CreateComment from "./CreateComment";


export default function StorePost() {
  const { id } = useParams();
  const post = useRecoilValue(storePostAtom(Number(id)))

  return (
    <HomeWrapper>
      <Base>
        {/*<TitleArea>*/}
        {/*  <Title></Title>*/}
        {/*</TitleArea>*/}
        <Content>
          <ImageBox style={{ backgroundImage: `url(${post.img})` }}/>
          <TextArea>{post.title}</TextArea>
          <TextArea>${post.price}</TextArea>
          <DescriptionArea>
            {post.description}
          </DescriptionArea>
        </Content>
        <CreateComment/>
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

const TitleArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  height: '6rem',
  marginLeft:'1rem',
  justifyContent:'center',
});

const Title = styled('div')({
  fontSize: '2rem',
  fontWeight:'700',
  textAlign:'left',
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
  height: '20rem',
  width:'100%',
  marginLeft: '1rem',
  textAlign:'left',
  paddingTop:'2rem',
});

const Content = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  padding: '2rem',
  marginBottom: '2rem',
  alignItems: 'center',
  backgroundColor:'white',
});

const CommentArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  marginTop:'1rem',
});

const ImageBox = styled('div')({
  width: '100%',
  height: '40rem',
  marginBottom: '3rem',
  backgroundPosition: 'center', // Center the image
  backgroundRepeat: 'no-repeat', // Do not repeat the image
});
