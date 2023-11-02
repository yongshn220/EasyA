import React, {useState} from 'react'
import Box from "@mui/material/Box";
import {COLOR} from "../../../util/util";
import {feedbackFieldRefAtom} from "../../../0.Recoil/easyAState";
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
      <Box style={{display:'flex', flex:'1', marginLeft:40, marginRight:40, padding:'20px', borderRadius:'5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)', transition: 'background-color 0.3s',}}
        onClick={handleSeeUpdates}
      >
        <Box style={{display:'flex', fontSize:'1.6rem', fontWeight:'600'}}>Recent Update : </Box>
        <Box style={{display:'flex', flex:1, fontSize:'1.6rem', fontWeight:'400', justifyContent:'flex-end', marginRight:'10px'}}>Prerequisite and Advisory-Prerequisite are added to each course.</Box>
      </Box>

      <Box sx={{display:'flex', flex: 1, justifyContent:'flex-end', marginTop:'10px', marginRight:'40px'}}>
        <Box sx={{cursor:'pointer', color:COLOR.yellow, "&:hover": { color: COLOR.lightYellow}}} onClick={handleGoToFeedback}>Do you want a new feature?</Box>
      </Box>
    </>
  )
}
