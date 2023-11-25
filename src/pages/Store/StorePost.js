import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {Checkbox, Input} from "@mui/material";
import {COLOR} from "../../util/util";
import Comment from "./Comment";


export default function StorePost() {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <HomeWrapper>
      <Base>
        <TitleArea>
          <Title>Buy & Sell</Title>
        </TitleArea>
        <Content>
          <ImageBox/>
          <TextArea>This is Test Area</TextArea>
          <TextArea>$10</TextArea>
          <DescriptionArea>
            This is Test Area This is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test AreaThis is Test Area
          </DescriptionArea>
        </Content>
        <CommentPostArea>
          <Input
            id="outlined-multiline-flexible"
            placeholder="Add a comment..."
            disableUnderline
            fullWidth
            autoComplete="off"
            inputProps={{maxLength: 100,}}
            style={{fontSize:'1.6rem', height:'5rem', paddingLeft:'1rem', marginBottom:'1rem', backgroundColor:'white'}}
          />
          <div style={{flex: 1, display: 'flex', justifyContent:'flex-end', fontSize:'1.2rem', fontWeight:'600'}}>
            <div style={{flex:1}}/>
            <div style={{flex:0}}>
              <Checkbox {...label} defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' },  '&.Mui-checked': {color: COLOR.fontGray50,},}} />
            </div>
            <div style={{display:'flex', flex: '0 0 12rem', flexDirection:'column', justifyContent:'center'}}>
              <div style={{display: 'inline-block', fontSize:'1.2rem', fontWeight:'700', color:COLOR.fontGray80}}>
                Secrete Comment
              </div>
              <div style={{display: 'inline-block', fontSize:'1rem', fontWeight:'600', color:COLOR.fontGray50}}>
                Only seller can see it
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight:'1rem', marginTop:'1rem'}}>
            <Button>Comment</Button>
          </div>
        </CommentPostArea>
        <CommentArea>
          <Comment/>
          <Comment/>
          <Comment/>
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

const CommentPostArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
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
  backgroundColor:'gray',
});

const Button = styled('div')({
  display:'flex',
  fontSize:'1.6rem',
  fontWeight:'600',
  width:'10rem',
  height:'3rem',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor: COLOR.mainYellow,
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow,
  },
  color: 'white',
  cursor:'pointer',
})
