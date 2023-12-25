import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import {Majors} from "../../0.Recoil/easyAState";
import {TextField} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {authAtom, userAtom} from "../../0.Recoil/accountState";
import {updateProfile} from "../../api/profileAPI";
import {popupMessageAtom} from "../../0.Recoil/utilState";
import {useEffect, useState} from "react";


export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: COLOR.main,
      cursor:'pointer',
      width:'7rem',
      height: '7rem',
      margin: '2rem',
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

export default function ProfileSetting() {
  const auth = useRecoilValue(authAtom)
  const [user, setUser] = useRecoilState(userAtom)
  const [major, setMajor] = useState(user.major)
  const setPopupMessage = useSetRecoilState(popupMessageAtom)

  useEffect(() => {
    if (!auth || !user) return (<></>)
  })

  function handleMajorChange(selectedMajor) {
    if (user.major === selectedMajor) return;

    const profileUpdateRequest = {major: selectedMajor}

    updateProfile(auth, profileUpdateRequest).then((res) => {
      if (res.status_code === 200) {
        setUser(user)
        setMajor(selectedMajor)
        setPopupMessage({state: true, severity: "info", message: "Profile updated"})
      }
      else {
        setPopupMessage({state: true, severity: "warning", message: "Fail to update profile"})
      }
    })
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
            value={major}
            renderInput={(params) => (
              <TextField {...params} label="Major" margin="normal"/>
            )}
            onInputChange={(event, selectedMajor) => {
              if (Majors.includes(selectedMajor))
                handleMajorChange(selectedMajor);
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
