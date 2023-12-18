import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {checkUserHasLikedAtom, postLikeCountAtom} from "../../0.Recoil/postState";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {createPostLike} from "../../api/postLikeAPI";
import {userAtom} from "../../0.Recoil/accountState";
import {popupMessageAtom} from "../../0.Recoil/utilState";


export default function StorePostLike({postId}) {
  const user = useRecoilValue(userAtom)
  const likeCount = useRecoilValue(postLikeCountAtom(postId))
  const hasLiked = useRecoilValue(checkUserHasLikedAtom(postId))
  const setPopupMessage = useSetRecoilState(popupMessageAtom)

  function handleLikePost() {
    if (!user) return setPopupMessage({state:true, severity: 'warning', message: "You need to login first to like the post."})

    createPostLike()
  }

  return (
    <Base>
      <div style={{fontSize:'1.6rem'}}>{`${likeCount} likes`}</div>
      {
        hasLiked?
        <FavoriteBorderIcon onClick={handleLikePost} sx={{fontSize: '2.5rem', cursor:'pointer'}}/>
          :
        <FavoriteBorderIcon onClick={handleLikePost} sx={{fontSize: '2.5rem', cursor:'pointer'}}/>
      }
    </Base>
  )
}

const Base = styled('div')({
  display:'flex',
  justifyContent:'flex-end',
  alignItems:'center',
  gap:'1rem',
  width:'100%',
})
