import * as React from "react";
import {Suspense, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import HomeWrapper from "../../components/HomeWrapper";
import {authAtom, userAtom} from "../../0.Recoil/accountState";
import {myStorePostIdsAtom} from "../../0.Recoil/postState";
import StoreItemBox from "../Store/StoreItemBox";
import ProfileSetting from "./ProfileSetting";
import LoadingCircle from "../Loading/LoadingCircle";
import {COLOR} from "../../util/util";
import ContentTypeMenu from "./ContentTypeMenu";


export default function ProfileHomeWrapper() {
  return (
    <HomeWrapper>
      <Suspense fallback={(<LoadingCircle/>)}>
        <ProfileHome/>
      </Suspense>
    </HomeWrapper>
  )
}

export const ContentType = {
  MY: "ContentTypeMy",
  LIKED: "ContentTypeLiked"
}

function ProfileHome() {
  const auth = useRecoilValue(authAtom)
  const user = useRecoilValue(userAtom)
  const postIds = useRecoilValue(myStorePostIdsAtom(user?.email))
  const [contentType, setContentType] = useState(ContentType.MY)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !auth.loggedIn) navigate('/')

  }, [auth, user, navigate])

  function handlePostClick(id) {
    navigate(`/store/post/${id}`)
  }

  return (
    <Base>
      <ProfileArea>
        <ProfileSetting/>
        <CommunityMenu>
          <MenuItem>Buy & Sell</MenuItem>
        </CommunityMenu>
      </ProfileArea>
      <ContentTypeMenu contentType={contentType} setContentType={setContentType}/>
      <Content>
        <Grid container>
          {
            postIds.map((id) => (
              <Suspense key={id} fallback={(<LoadingCircle/>)}>
                <Grid item xs={3}>
                  <StoreItemBox onClick={() => handlePostClick(id)} id={id}/>
                </Grid>
              </Suspense>
            ))
          }
        </Grid>
      </Content>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop:'3rem',
  paddingLeft:'2rem',
  paddingRight:'2rem',
  height:'100%',
});

const ProfileArea = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '20rem',
  marginBottom:'2rem',
  borderRadius: '5px',
  backgroundColor:'white',
})

const CommunityMenu = styled('div')({
  display: 'flex',
  flex: '0 0 5rem',
  borderTop: `1px solid ${COLOR.lineGray30}`,
  alignItems: 'center',
  paddingLeft: '2rem',
  paddingRight: '2rem',
})

const MenuItem = styled('div')({
  display: 'flex',
  fontSize: '1.6rem',
  fontWeight: '600',
  paddingBottom: '0.3rem',
  borderBottom: `1px solid black`,
  cursor:'pointer',
})

const Content = styled('div')({
  display: 'flex',
  borderRadius: '5px',
  padding:'1rem',
  boxSizing: 'border-box',
  backgroundColor:'white',
});
