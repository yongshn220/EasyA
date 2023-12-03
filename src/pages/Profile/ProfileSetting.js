import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import {Majors} from "../../0.Recoil/easyAState";
import {TextField} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../0.Recoil/accountState";


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

export default function ProfileSetting() {
  const user = useRecoilValue(userAtom)

  function setMajor(major) {

  }


  return (
    <Base>
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
    </Base>
  )
}

const Base = styled('div')({
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
