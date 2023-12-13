import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import {useNavigate} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {deletePost} from "../../api/api";
import {useRecoilRefresher_UNSTABLE, useSetRecoilState} from "recoil";
import {storePostIdsAtom} from "../../0.Recoil/postState";
import {popupMessageAtom} from "../../0.Recoil/utilState";

export default function PostHeaderMenu({auth, id}) {
  const postIdsRefresh = useRecoilRefresher_UNSTABLE(storePostIdsAtom)
  const setPopupMessage = useSetRecoilState(popupMessageAtom)
  const navigate = useNavigate()

  function handleEditPost(popupState) {
    popupState.close()
    navigate(`/store/edit/${id}`)
  }

  function handleDeletePost(popupState) {
    popupState.close()
    deletePost(auth, id).then((res) => {
      if (res.status_code === 200) {
        postIdsRefresh()
        setPopupMessage({state:true, message: "The post deleted successfully.", severity: "info"})
        navigate('/store')
      }
      else {
        setPopupMessage({state:true, message: "Fail to delete the post.", severity: "warning"})
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
