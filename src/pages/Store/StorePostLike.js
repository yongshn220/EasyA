import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from "react";
import {styled} from "@mui/material/styles";
import {checkUserHasLikedAtom, postLikeCountAtom} from "../../0.Recoil/postState";
import {useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState} from "recoil";
import {createPostLike, deletePostLike} from "../../api/postLikeAPI";
import {authAtom, userAtom} from "../../0.Recoil/accountState";
import {popupMessageAtom} from "../../0.Recoil/utilState";
import {Suspense} from "react";


export default function StorePostLikeWrapper({postId}) {
  return (
    <Base>
      <Suspense fallback={<></>}>
        <StorePostLike postId={postId}/>
      </Suspense>
    </Base>
  )
}


function StorePostLike({postId}) {
  const auth = useRecoilValue(authAtom)
  const user = useRecoilValue(userAtom)
  const likeCount = useRecoilValue(postLikeCountAtom(postId))
  const likeCountRefresh = useRecoilRefresher_UNSTABLE(postLikeCountAtom(postId))
  const hasLiked = useRecoilValue(checkUserHasLikedAtom(postId))
  const hasLikedRefresh = useRecoilRefresher_UNSTABLE(checkUserHasLikedAtom(postId))
  const setPopupMessage = useSetRecoilState(popupMessageAtom)

  function handleLikePost() {
    if (!user) return setPopupMessage({state:true, severity: 'warning', message: "You need to login first to like the post."})

    createPostLike(auth, postId).then((res) => {
      if (res.status_code === 200) {
        likeCountRefresh()
        hasLikedRefresh()
        setPopupMessage({state:true, severity: 'info', message: "You liked the post."})
      }
    })
  }

  function handleCancelLikePost() {
    deletePostLike(auth, postId).then((res) => {
      if (res.status_code === 200) {
        likeCountRefresh()
        hasLikedRefresh()
      }
    })
  }

  return (
    <>
      <div style={{fontSize:'1.6rem'}}>{`${likeCount} likes`}</div>
      {
        hasLiked?
        <FavoriteIcon onClick={handleCancelLikePost} sx={{fontSize: '2.5rem', cursor:'pointer', color:'red'}}/>
          :
        <FavoriteBorderIcon onClick={handleLikePost} sx={{fontSize: '2.5rem', cursor:'pointer'}}/>
      }
    </>
  )
}

const Base = styled('div')({
  display:'flex',
  justifyContent:'flex-end',
  alignItems:'center',
  gap:'1rem',
  width:'100%',
  height:'4rem',
})
