import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";

export default function DayOffHeader() {
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/")
  }

  function navigateToDayOffPage() {
    navigate("/easya")
  }

  return (
    <>
      <Box style={{display:'flex', height:'50px', width:'100%', backgroundImage: `url('/graybg.jpeg')`, backgroundColor:'red'}}>
        <Box style={{position:'relative', marginLeft:'1vw', paddingTop:'1rem', justifyContent:'center', alignItems:'center', fontSize:'1.6rem', fontWeight:'700', textAlign:'left', cursor:'pointer'}}
             onClick={navigateToHome}
        >
          HOME
        </Box>
        <Box style={{position:'relative', marginLeft:'3rem', paddingTop:'1rem', justifyContent:'center', alignItems:'center', fontSize:'1.6rem', fontWeight:'700', textAlign:'left', cursor:'pointer'}}
             onClick={navigateToDayOffPage}
        >
          Course Ranking
        </Box>
      </Box>
    </>
  );
}
