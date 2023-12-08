import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {InputAdornment, TextField} from "@mui/material";
import {COLOR} from "../../util/util";
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState} from "recoil";
import {useNavigate, useParams} from "react-router-dom";
import {authAtom} from "../../0.Recoil/accountState";
import {updatePost} from "../../api/api";
import {popupMessageAtom} from "../../0.Recoil/utilState";
import {storePostAtom} from "../../0.Recoil/postState";
import CenterLoadingCircle from "../Loading/CenterLoadingCircle"; // Import the delete icon


export default function StoreEditPost() {
  const { _id } = useParams();
  const post = useRecoilValue(storePostAtom(_id))
  const auth = useRecoilValue(authAtom)
  const setPopupMessage = useSetRecoilState(popupMessageAtom)
  const postRefresh = useRecoilRefresher_UNSTABLE(storePostAtom(_id))

  const navigate = useNavigate()
  const [images, setImages] = useState(post.images);
  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [title, setTitle] = useState(post.title);
  const [price, setPrice] = useState(post.price);
  const [description, setDescription] = useState(post.description);
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value !== '' ? parseInt(value, 10) : '');
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = images.length + files.length;

    if (totalImages <= 5) {
      files.forEach(file => {
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImages(prevImages => [...prevImages, reader.result]);
            setImagesToAdd(prevImages => [...prevImages, reader.result])
          };
          reader.readAsDataURL(file);
        }
      });
    }
    else {
      console.error("Cannot upload more than 5 images");
    }
  };

  const handleDeleteImage = (index) => {
    const imageToDelete = images[index];

    // If the image is a newly added image, not include it in the ImagesToDelete.
    if (imagesToAdd.includes(imageToDelete)) {
      setImagesToAdd(imagesToAdd => imagesToAdd.filter(img => img !== imageToDelete));
    }
    else {
      setImagesToDelete(prevImagesToDelete => [...prevImagesToDelete, imageToDelete]);
    }

    setImages(images => images.filter((_, i) => i !== index));
  };

  function handleUpdate() {
    setIsLoading(true)
    const postUpdateRequest = {
      images_to_add: imagesToAdd,
      images_to_delete: imagesToDelete,
      title: title,
      price: price,
      description: description
    }
    updatePost(auth, postUpdateRequest, _id).then((res) => {
      setIsLoading(false)
      if (res.status_code === 200) {
        postRefresh()
        setPopupMessage({state: true, message: "Your post updated successfully.", severity: "info"})
        navigate('/store');
      }
      else {
        setPopupMessage({state: true, message: "Fail to update the post.", severity: "warning"})
      }
    }).catch((error) => {
      setIsLoading(false)
    })
  }

  return(
    <HomeWrapper>
      <CenterLoadingCircle state={isLoading}/>
      <Base>
        <TitleArea>
          <Title>Edit your item</Title>
        </TitleArea>
        <Content>
          <ImageArea>
            {
              images.map((img, index) => (
                <ImageBox key={index} style={{ backgroundImage: `url(${img})` }}>
                  <DeleteButton onClick={() => handleDeleteImage(index)}>
                    <DeleteIcon style={{ fontSize: '2rem' }} />
                  </DeleteButton>
                </ImageBox>
              ))
            }
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
          </ImageArea>
          {
            (images.length < 5) && (
              <label htmlFor="file-input">
                <UploadButton variant="contained" component="span">
                  Upload Image
                </UploadButton>
              </label>
            )
          }
          <div style={{fontSize:'1.6rem', fontWeight:'600', color:COLOR.mainYellow}}>{images.length}/5</div>
          <TextField
            id="outlined-multiline-flexible"
            label={<div style={{backgroundColor:'white', paddingRight:'5px'}}>Title</div>}
            maxRows={4}
            fullWidth
            autoComplete="off"
            value={title}
            onChange={handleTitleChange}
            sx={{
              marginTop:'2rem',
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
              '& .MuiInputLabel-root': { fontSize: '1.6rem' },
            }}
          />
          <TextField
            id="price-input"
            type="number"
            label={<div style={{backgroundColor:'white', paddingRight:'5px'}}>Price</div>}
            maxRows={4}
            fullWidth
            autoComplete="off"
            value={price}
            onChange={handlePriceChange}
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: '1.6rem' }}>$</span>
                </InputAdornment>
              )
            }}
            sx={{
              marginTop:'2rem',
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
              '& .MuiInputLabel-root': { fontSize: '1.6rem' },
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label={<div style={{backgroundColor:'white', paddingRight:'5px'}}>Description</div>}
            multiline
            rows={15}
            fullWidth
            autoComplete="off"
            value={description}
            onChange={handleDescriptionChange}
            sx={{
              marginTop:'2rem',
              marginBottom:'2rem',
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
              '& .MuiInputLabel-root': { fontSize: '1.6rem' },
            }}
          />
          <Button onClick={handleUpdate}>Update</Button>
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

const ImageArea = styled('div')({
  position:'relative',
  display:'flex',
  justifyContent:'left',
  alignItems:'center',
  width: '100%',
  height: '20rem',
  border: `1px solid ${COLOR.lineGray}`,
  padding: '0.5rem',
  boxSizing: 'border-box',
  marginBottom:'2rem',
});

const ImageBox = styled('div')({
  position:'relative',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  width: '20%',
  height: '100%',
  borderRadius:'5px',
  margin:'1px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
})

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
  right: '0.5rem',
  bottom: '0.5rem',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
});
