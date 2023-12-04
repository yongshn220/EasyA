import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import {useNavigate} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {deletePost} from "../../api/api";
import {useSetRecoilState} from "recoil";
import {dayOffPopupMessageAtom} from "../DayOff/components/DayOffState";

export default function PostHeaderMenu({user, _id}) {
  const setPopupMessage = useSetRecoilState(dayOffPopupMessageAtom)
  const navigate = useNavigate()

  function handleEditPost(popupState) {
    popupState.close()
    navigate(`/store/edit/${_id}`)
  }

  function handleDeletePost(popupState) {
    popupState.close()
    deletePost(user, _id).then((res) => {
      if (res.status_code === 200) {
        setPopupMessage({state:true, message: "The post deleted successfully.", severity: "info"})
        navigate('/store')
      }
      else {
        console.log("SWW")
      }
    })
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <MenuIcon sx={{fontSize:'2rem', cursor:'pointer'}} {...bindTrigger(popupState)} />
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => handleEditPost(popupState)} sx={{fontSize:'1.6rem'}}>Edit</MenuItem>
            <MenuItem onClick={() => handleDeletePost(popupState)} sx={{fontSize:'1.6rem'}}>Delete</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  )
}
