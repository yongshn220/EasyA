import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from "@mui/material/Avatar";
import {COLOR} from "../../../util/util";
import {useSetRecoilState} from "recoil";
import {emptyUser, userAtom} from "../../../0.Recoil/accountState";
import {useNavigate} from "react-router-dom";

export default function AvatarMenu({user}) {
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userAtom)
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: COLOR.mainYellow,
        cursor:'pointer',
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  function logout(popupState) {
    popupState.close()
    setUser(emptyUser)
    localStorage.removeItem("user")
    navigate('/')
  }

  function gotoProfile(popupState) {
    popupState.close()
    navigate('/profile')
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Avatar {...stringAvatar(user?.email?.toUpperCase())} {...bindTrigger(popupState)}/>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => gotoProfile(popupState)} sx={{fontSize:'1.6rem'}}>Profile</MenuItem>
            <MenuItem onClick={() => logout(popupState)} sx={{fontSize:'1.6rem'}}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  )
}
