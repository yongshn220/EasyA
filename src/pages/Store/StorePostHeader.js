import Avatar from "@mui/material/Avatar";
import TimeHelper from "../../util/timeHelper";
import PostHeaderMenu from "./PostHeaderMenu";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";
import {useRecoilValue} from "recoil";
import {authAtom} from "../../0.Recoil/accountState";

export function stringAvatar() {
  return {
    sx: {
      bgcolor: COLOR.main,
      width:'4rem',
      height: '4rem',
      marginRight:'1rem',
    },
  };
}

export default function StorePostHeader({isMyPost, post}) {
  const auth = useRecoilValue(authAtom)

  return (
    <Base>
      <div style={{display:'flex'}}>
        <HeaderProfile>
          <HeaderAuthorInfo>
            <Avatar {...stringAvatar()} />
            <AuthorName>{isMyPost? "Me" : "Author"}</AuthorName>
          </HeaderAuthorInfo>
        </HeaderProfile>
        <HeaderMenu>
          {isMyPost && <PostHeaderMenu auth={auth} id={post.id}/>}
        </HeaderMenu>
      </div>
      <div>
        <HeaderPostInfo>
          {TimeHelper.getTopElapsedStringUntilNow(post.timestamp)} ago
        </HeaderPostInfo>
      </div>
    </Base>
  )
}


const Base = styled('div')({
  display:'flex',
  flexDirection:'column',
  width:'100%',
  height:'8rem',
})

const HeaderProfile = styled('div')({
  display:'flex',
  flexDirection: 'column',
  flex: 1,
})

const HeaderAuthorInfo = styled('div')({
  display:'flex',
  marginBottom:'1rem',
  flex: 1,
})

const AuthorName = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontSize:'1.6rem',
  fontWeight:'600',
})

const HeaderPostInfo = styled('div')({
  display:'flex',
  flex: 1,
  fontSize:'1.4rem',
  color:COLOR.fontGray50,
})

const HeaderMenu = styled('div')({
  display:'flex',
  alignItems:'center',
  gap:'1rem',
})
