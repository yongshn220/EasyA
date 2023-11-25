import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";
import {COLOR} from "../../util/util";


export default function StoreCreatePost() {
  return(
    <HomeWrapper>
      <Base>
        <TitleArea>
          <Title>Sell a Item</Title>
        </TitleArea>
        <Content>
          <ImageBox/>
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            maxRows={4}
            fullWidth
            sx={{marginTop:'2rem'}}
          />
          <TextField
          id="outlined-multiline-flexible"
          label="Price"
          maxRows={4}
          fullWidth
          sx={{marginTop:'2rem'}}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={15}
            fullWidth
            sx={{marginTop:'2rem', marginBottom:'2rem'}}
          />
          <Button>Post</Button>
        </Content>
      </Base>
    </HomeWrapper>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  paddingTop:'5rem',
  paddingBottom:'3rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  alignItems: 'center',
  backgroundColor:'white',
});

const ImageBox = styled('div')({
  width: '20rem',
  height: '20rem',
  backgroundColor:'gray',
});

const TitleArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  height: '6rem',
  marginLeft:'1rem',
  justifyContent:'center',
});

const Title = styled('div')({
  fontSize: '2.0rem',
  fontWeight:'700',
  textAlign:'left',
});

const Button = styled('div')({
  display:'flex',
  fontSize:'1.6rem',
  fontWeight:'600',
  width:'8rem',
  height:'3rem',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor: COLOR.mainYellow,
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow,
  },
  color: 'white',
  borderRadius:'2px',
  cursor:'pointer',
})
