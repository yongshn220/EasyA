import React from "react";
import {Suspense} from "react";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import GradeRank from "../components/GradeRank"
import StudyingHoursRank from "../components/StudyingHoursRank"
import {useRecoilValue} from "recoil";
import {defaultYearAtom, summaryByStartYearAtom} from "../0.Recoil/summaryState";
import MainBanner from "../components/MainBanner";
import '../App.css';

export default function HomeWrapper() {
  return (
    <div>
      <PageHeader/>
      <Home/>
    </div>
  )
}

function Home() {
  return (
    <Box>
      <Box style={{display:'flex', flexDirection:'column', position:'absolute', width:'100%'}}>
        <Box style={{display:'flex', flex:"0 0 350px", flexDirection:'column', justifyContent:'center', }}>
          <MainBanner/>
        </Box>
        <Suspense fallback={(<div>Loading</div>)}>
          <MainContent/>
        </Suspense>
      </Box>
    </Box>
  )
}


function MainContent() {
  const currentYear = useRecoilValue(defaultYearAtom);
  const summary = useRecoilValue(summaryByStartYearAtom(currentYear))

  console.log("All summary:", summary);
  return (
    <Box style={{flex:1, display:'flex'}}>
      <Box style={{display:'flex', flex:"1"}}>
        <GradeRank data={summary.data}/>
      </Box>
      <Box style={{display:'flex', flex:"1"}}>
        <StudyingHoursRank data={summary.data}/>
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
