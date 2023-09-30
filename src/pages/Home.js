import React from "react";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import CourseRank from "../components/CourseRank";

export default function Home() {

  return (
    <Box>
      <PageHeader></PageHeader>
      <Box style={{display:'flex', flexDirection:'column', position:'absolute', width:'100%'}}>
        <Box style={{flex:"0 0 300px", backgroundColor:'gray'}}>

        </Box>
        <Box style={{flex:1, display:'flex'}}>
          <Box style={{display:'flex', flex:"1"}}>
            <CourseRank/>
          </Box>
          <Box style={{display:'flex', flex:"1"}}>
            <CourseRank/>
          </Box>
          <Box style={{display:'flex', flex:"1"}}>
            <CourseRank/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


function PageHeader() {
  return (
    <>
      <Box style={{display:'flex', position:'relative', height:'50px', width:'100%'}}>
        <Box style={{display:'flex', width:200,  justifyContent:'center', alignItems:'center', fontWeight:'700'}}>SBU@EasyA</Box>
        <Box style={{flex:1}}></Box>
      </Box>
      <Divider/>
    </>
  );
}
