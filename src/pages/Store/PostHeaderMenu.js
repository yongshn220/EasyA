import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import {useNavigate} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function PostHeaderMenu() {
  const navigate = useNavigate()

  function handleEditPost(popupState) {
    popupState.close()
    localStorage.removeItem("user")
    // navigate('/')
  }

  function handleDeletePost(popupState) {
    popupState.close()
    // navigate('/profile')
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <MenuIcon sx={{fontSize:'2rem'}} {...bindTrigger(popupState)} />
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => handleEditPost(popupState)} sx={{fontSize:'1.6rem'}}>Edit</MenuItem>
            <MenuItem onClick={() => handleDeletePost(popupState)} sx={{fontSize:'1.6rem'}}>Delete</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  )
}
