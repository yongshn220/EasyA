import React, {useEffect} from "react";
import {Suspense} from "react";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import GradeRank from "../components/GradeRank"
import StudyingHoursRank from "../components/StudyingHoursRank"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { defaultYearAtom, HardwareType, selectedCourseDataAtom, summaryByStartYearAtom, userHardWareTypeAtom } from "../0.Recoil/summaryState";
import MainBanner from "../components/MainBanner";
import '../App.css';
import CourseDetailPanel from "../components/CourseDetailPanel";
import CourseFilter from "../components/CourseFilter";

export default function HomeWrapper() {
  return (
    <div>
      <PageHeader/>
      <Home/>
    </div>
  )
}

function Home() {
  const [selectedCourseData, setSelectedCourseData] = useRecoilState(selectedCourseDataAtom);
  const setUserHardWareTypeAtom = useSetRecoilState(userHardWareTypeAtom);

  useEffect(() => {
    if (isMobileDevice()) {
      setUserHardWareTypeAtom(HardwareType.MOBILE);
    }
  }, [setUserHardWareTypeAtom])

  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Mobile|webOS|Opera Mini/i.test(navigator.userAgent);
  }

  function handleClickBackground() {
    console.log("click background")
    setSelectedCourseData(null)
  }

  return (
    <Box>
      <Box onClick={() => handleClickBackground()} style={{display:'flex', flexDirection:'column', position:'absolute', width:'100%'}}>
        <Box style={{display:'flex', flex:"0 0 350px", flexDirection:'column', justifyContent:'center'}}>
          <MainBanner/>
        </Box>
        <Box style={{display:'flex', flex:'0 0 350px', marginTop:'20px', marginBottom:'40px', justifyContent:'center', backgroundColor:'white'}}>
          <Suspense fallback={(<div></div>)}>
            <CourseFilter/>
          </Suspense>
        </Box>
        <Suspense fallback={(<div>Loading</div>)}>
          <MainContent/>
        </Suspense>
      </Box>
      {
        selectedCourseData &&
        <Suspense fallback={(<div>Loading</div>)}>
          <CourseDetailPanel/>
        </Suspense>
      }
    </Box>
  )
}


function MainContent() {
  const currentYear = useRecoilValue(defaultYearAtom);
  const summary = useRecoilValue(summaryByStartYearAtom(currentYear))

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
        <Box style={{display:'flex', flex: '0', width: "100vw", marginLeft:'1vw', justifyContent:'center', alignItems:'center', fontSize:'1.6rem', fontWeight:'700'}}>SBU@EasyA</Box>
      </Box>
      <Divider/>
    </>
  );
}
