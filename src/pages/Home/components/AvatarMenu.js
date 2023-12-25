import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from "@mui/material/Avatar";
import {COLOR} from "../../../util/util";
import {useSetRecoilState} from "recoil";
import {authAtom, emptyAuth, userAtom} from "../../../0.Recoil/accountState";
import {useNavigate} from "react-router-dom";
import {LocalStorageHelper} from "../../../util/localStorageHelper";

export default function AvatarMenu({user}) {
  const navigate = useNavigate()
  const setAuth = useSetRecoilState(authAtom)
  const setUser = useSetRecoilState(userAtom)
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: COLOR.main,
        cursor:'pointer',
      },
      children: (name)? `${name.split(' ')[0][0]}` : '',
    };
  }

  function logout(popupState) {
    popupState.close()
    setAuth(emptyAuth)
    setUser(null)
    LocalStorageHelper.removeAuth()
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
