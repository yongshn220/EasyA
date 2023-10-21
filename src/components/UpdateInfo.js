import React, {useState} from 'react'
import Box from "@mui/material/Box";
import {COLOR} from "../util/util";
import {feedbackFieldRefAtom} from "../0.Recoil/summaryState";
import {useRecoilValue} from "recoil";

export default function UpdateInfo() {
  const [fullView, setFullView] = useState(false);
  const feedbackFieldRef = useRecoilValue(feedbackFieldRefAtom)

  function handleSeeUpdates() {
    setFullView(!fullView);
  }

  function handleGoToFeedback() {
    if (feedbackFieldRef.current) {
      feedbackFieldRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }

  return (
    <>
      <Box style={{display:'flex', flex:'1', marginLeft:40, marginRight:40, padding:'20px', borderRadius:'5px', boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.4)', cursor: "pointer", transition: 'background-color 0.3s',}}
        sx={{"&:hover": { background: "rgba(255, 255, 255, 0.1)"}}}
        onClick={handleSeeUpdates}
      >
        <Box style={{display:'flex', fontSize:'1.6rem', fontWeight:'600'}}>Recent Update : </Box>
        <Box style={{display:'flex', flex:1, fontSize:'1.6rem', fontWeight:'400', justifyContent:'flex-end', marginRight:'10px'}}>Add missing SBCs (LANG, HFA+, WRT)</Box>
      </Box>
      <Box sx={{display:'flex', flex: 1, justifyContent:'flex-end', marginTop:'10px', marginRight:'40px'}}>
        <Box sx={{cursor:'pointer', color:COLOR.yellow, "&:hover": { color: COLOR.lightYellow}}} onClick={handleGoToFeedback}>Do you want a new feature?</Box>
      </Box>
    </>
  )
}
