import {Checkbox, Input} from "@mui/material";
import {COLOR} from "../../util/util";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import {addComment} from "../../api/commentAPI";
import {useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState} from "recoil";
import {authAtom, userAtom} from "../../0.Recoil/accountState";
import {storePostAtom} from "../../0.Recoil/postState";
import {popupMessageAtom} from "../../0.Recoil/utilState";


export default function CreateComment({postId}) {
  const auth = useRecoilValue(authAtom)
  const user = useRecoilValue(userAtom)
  const postRefresh = useRecoilRefresher_UNSTABLE(storePostAtom(postId))
  const setPopupMessage = useSetRecoilState(popupMessageAtom)
  const [commentText, setCommentText] = useState('');
  const [isSecret, setIsSecret] = useState(false);


  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsSecret(event.target.checked);
  };

  const HandleAddComment = () => {
    addComment(auth, user, postId, commentText, isSecret).then(res =>{
      if (res.status_code === 200) {
        postRefresh()
      }
      else {
        setPopupMessage({state: true, message: "Fail to add a comment", severity: "warning"})
      }
    })

    // Reset fields after submission
    setCommentText('');
    setIsSecret(false);
  };


  return (
    <Base>
      <Input
        id="outlined-multiline-flexible"
        placeholder={(user) ? "Add a comment..." : "Login to add a comment."}
        disabled={!user}
        disableUnderline
        fullWidth
        autoComplete="off"
        value={commentText}
        onChange={handleInputChange}
        inputProps={{maxLength: 100,}}
        style={{fontSize:'1.6rem', height:'5rem', paddingLeft:'1rem', marginBottom:'1rem', backgroundColor:'white', borderRadius: '5px',
          border: `0.5px solid ${COLOR.lineGray}`,}}
      />
      <div style={{flex: 1, display: 'flex', justifyContent:'flex-end', fontSize:'1.2rem', fontWeight:'600'}}>
        <div style={{flex:0}}>
          <Checkbox
            disabled={!user}
            checked={isSecret}
            onChange={handleCheckboxChange}
            sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' },  '&.Mui-checked': {color: COLOR.fontGray50,},}}
          />
        </div>
        <div style={{display:'flex', flex: '0 0 12rem', flexDirection:'column', justifyContent:'center'}}>
          <div style={{display: 'inline-block', fontSize:'1.2rem', fontWeight:'700', color:COLOR.fontGray80}}>
            Secret Comment
          </div>
          <div style={{display: 'inline-block', fontSize:'1rem', fontWeight:'600', color:COLOR.fontGray50}}>
            Only seller can see it
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight:'1rem', marginTop:'1rem'}}>
        <Button disabled={!user} onClick={HandleAddComment}>Comment</Button>
      </div>
    </Base>
  )
}


const Base = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  borderRadius:'5px',
  padding:'2rem',
  backgroundColor:'white',
});

const Button = styled('div')(({ disabled }) => ({
  display: 'flex',
  fontSize: '1.6rem',
  fontWeight: '600',
  width: '10rem',
  height: '3rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  backgroundColor: disabled ? COLOR.lineGray : COLOR.mainYellow,
  '&:hover': {
    backgroundColor: disabled ? COLOR.lineGray : COLOR.mainLightYellow,
  },
  color: 'white',
  cursor: disabled ? 'default' : 'pointer',
  pointerEvents: disabled ? 'none' : 'auto',
  opacity: disabled ? 0.5 : 1,
}));
