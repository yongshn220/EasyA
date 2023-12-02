import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import {userAtom} from "../../0.Recoil/accountState";
import {useRecoilValue} from "recoil";
import {Majors} from "../../0.Recoil/easyAState";
import {Input, TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import StoreItemBox from "../Store/StoreItemBox";
import {storePostIdsAtom} from "../../0.Recoil/postState";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: COLOR.mainYellow,
      cursor:'pointer',
      width:'7rem',
      height: '7rem',
      margin: '2rem',
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

export default function ProfileHome() {
  const user = useRecoilValue(userAtom)
  const postIds = useRecoilValue(storePostIdsAtom)


  function setMajor(major) {

  }

  function handlePostClick() {

  }

  return (
    <HomeWrapper>
      <Base>
        <ProfileArea>
          <ProfileSetting>
            <Avatar {...stringAvatar(user?.email?.toUpperCase())} />
            <Info>
              <InfoItem>
                <InfoItemKey>Email</InfoItemKey>
                <InfoItemValue>{user.email}</InfoItemValue>
              </InfoItem>
              <InfoItem>
                <InfoItemKey>Major</InfoItemKey>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Majors}
                  renderInput={(params) => (
                    <TextField {...params} label="Major" margin="normal"/>
                  )}
                  onInputChange={(event, newInputValue) => {
                    setMajor(newInputValue);
                  }}
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '1.2rem' },
                  }}
                />
              </InfoItem>
            </Info>
          </ProfileSetting>
          <CommunityMenu>
            <MenuItem>Buy & Sell</MenuItem>
          </CommunityMenu>
        </ProfileArea>
        <Content>
          {
            postIds.map(id => (
              <StoreItemBox onClick={() => handlePostClick(id)} id={id}/>
            ))
          }
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

const ProfileSetting = styled('div')({
  display: 'flex',
  flex: 1,
  width: '100%',
  alignItems:'center',
  padding: '2rem',
  boxSizing: 'border-box',
})

const Info = styled('div')({
  display: 'flex',
  flexDirection:'column',
  flex: 1,
  justifyContent:'center',
  height:'100%',
})

const InfoItem = styled('div')({
  display:'flex',
  alignItems:'center',
  height:'3rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  marginTop:'1rem',
  marginBottom:'1rem',
})

const InfoItemKey = styled('div')({
  fontSize: '1.6rem',
  fontWeight: '500',
  marginRight:'4rem',
})

const InfoItemValue = styled('div')({
  fontSize: '1.6rem',
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
  height:'25rem',
  borderRadius: '5px',
  padding:'2rem',
  boxSizing: 'border-box',
  backgroundColor:'white',
});
