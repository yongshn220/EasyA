import Box from "@mui/material/Box";
import {COLOR, ContentWidthDesktop} from "../../util/util";
import {useNavigate} from 'react-router-dom';
import React from "react";
import MainHeader from "./components/MainHeader";
import BaseLayout from "./components/BaseLayout";
import {styled} from "@mui/material/styles";
import HomeContent from "./components/HomeContent";


export default function HomePage() {
  const navigate = useNavigate();

  function handleClickEasyAPage() {
    navigate("/easya")
  }

  function handleClickDayOffPage() {
    navigate("/dayoffmaker")
  }

  return (
    <BaseLayout>
      <Side/>
      <Content>
        <HomeContent/>
      </Content>
      <Side/>
    </BaseLayout>
  )
}


const Content = styled('div')({
  position:'relative',
  display: 'flex',
  flexDirection: 'column',
  flex: `0 0 ${ContentWidthDesktop}`,
  borderLeft: `1px solid ${COLOR.lineGray}`,
  borderRight: `1px solid ${COLOR.lineGray}`,
});

const Side = styled('div')({
  flex: 1,
  '@media (max-width: 600px)': {
    // Hide or minimize the side components on mobile
    display: 'none',
  },
});


















/*
<div style={{position:'relative', width:'100%', minHeight:'100vh', backgroundImage: `url('/graybg.jpeg')`}}>
        <Box style={{paddingTop:'5vh', fontSize:'6rem', fontWeight:'700'}}>
          Make <span style={{ color: COLOR.yellow }}>SBU</span> Life Easier
        </Box>
        <Box style={{display:'flex', flex:1, height:'30vh', marginTop:'20vh'}}>
          <Box onClick={() => {handleClickEasyAPage()}} style={{display:'flex', flex: 1}}>
            <Box sx={{"&:hover": { background: "rgba(255, 255, 255, 0.1)"}}} style={{display:'flex', flexDirection:'column', flex:'1', margin:20, borderRadius:'5px',  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)', cursor:'pointer', transition: 'background-color 0.3s'}}>
              <Box style={{display:'flex', flex:1, flexDirection:'column', margin:30}}>
                <div style={{fontSize:'2rem', fontWeight:'700', textAlign:'left', marginBottom:10}}>SBU Easy A</div>
                <div style={{fontSize:'1.6rem', fontWeight:'500', textAlign:'left'}}>Easy-A course ranking of Stony Brook University.</div>
              </Box>
            </Box>
          </Box>
          <Box onClick={() => {handleClickDayOffPage()}} style={{display:'flex', flex: 1}}>
            <Box sx={{"&:hover": { background: "rgba(255, 255, 255, 0.1)"}}} style={{display:'flex', flexDirection:'column' ,flex:'1', margin:20, borderRadius:'5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)', cursor:'pointer', transition: 'background-color 0.3s'}}>
              <Box style={{display:'flex', flex:1, flexDirection:'column', margin:30}}>
                <div style={{fontSize:'2rem', fontWeight:'700', textAlign:'left', marginBottom:10}}>SBU Day Off Maker <span style={{color:COLOR.yellow}}>(Beta) (PC Recommended)</span></div>
                <div style={{fontSize:'1.6rem', fontWeight:'500', textAlign:'left'}}>Find courses that match on your schedule. Make a day-off schedule.</div>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
 */
