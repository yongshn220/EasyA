import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";
import {COLOR} from "../../util/util";
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon


export default function StoreCreatePost()

  {const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };


  return(
    <HomeWrapper>
      <Base>
        <TitleArea>
          <Title>Sell an Item</Title>
        </TitleArea>
        <Content>
          <ImageBox style={{ backgroundImage: `url(${image})` }}>
            {image && (
              <DeleteButton onClick={handleDeleteImage}>
                <DeleteIcon style={{fontSize:'2rem'}}/>
              </DeleteButton>
            )}
            {!image && (
              <label htmlFor="file-input">
                <UploadButton variant="contained" component="span">
                  Upload Image
                </UploadButton>
              </label>
            )}
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageBox>
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            maxRows={4}
            fullWidth
            autoComplete="off"
            sx={{marginTop:'2rem'}}
          />
          <TextField
          id="outlined-multiline-flexible"
          label="Price"
          maxRows={4}
          fullWidth
          autoComplete="off"
          sx={{marginTop:'2rem'}}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={15}
            fullWidth
            autoComplete="off"
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

const ImageBox = styled('div')({
  position:'relative',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  width: '100%',
  height: '20rem',
  borderRadius:'5px',
  border: `1px solid ${COLOR.lineGray}`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
});

const UploadButton = styled('div')({
  display:'flex',
  fontSize:'1.6rem',
  fontWeight:'600',
  width:'14rem',
  height:'3rem',
  alignItems:'center',
  justifyContent:'center',
  border: `1px solid ${COLOR.mainYellow}`,
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow10,
  },
  color: COLOR.mainYellow,
  borderRadius:'30px',
  cursor:'pointer',
})

const DeleteButton = styled('button')({
  position: 'absolute',
  right: '1rem',
  bottom: '1rem',
  backgroundColor: 'white',
  border: 'none',
  cursor: 'pointer',
});
