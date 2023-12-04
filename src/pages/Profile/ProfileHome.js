import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";
import * as React from "react";
import {userAtom} from "../../0.Recoil/accountState";
import {useRecoilValue} from "recoil";
import StoreItemBox from "../Store/StoreItemBox";
import {myStorePostIdsAtom} from "../../0.Recoil/postState";
import ProfileSetting from "./ProfileSetting";
import {Suspense} from "react";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";


export default function ProfileHome() {
  const user = useRecoilValue(userAtom)
  const postIds = useRecoilValue(myStorePostIdsAtom(user.email))
  const navigate = useNavigate()

  function handlePostClick(id) {
    navigate(`/store/post/${id}`)
  }

  return (
    <HomeWrapper>
      <Base>
        <ProfileArea>
          <ProfileSetting/>
          <CommunityMenu>
            <MenuItem>Buy & Sell</MenuItem>
          </CommunityMenu>
        </ProfileArea>
        <Content>
          <Grid container>
            {
              postIds.map((id) => (
                <Suspense fallback={(<div>loading</div>)}>
                  <Grid item xs={3}>
                    <StoreItemBox onClick={() => handlePostClick(id)} id={id}/>
                  </Grid>
                </Suspense>
              ))
            }
          </Grid>
        </Content>
      </Base>
    </HomeWrapper>
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
