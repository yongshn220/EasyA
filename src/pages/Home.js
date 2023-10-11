import React, {useEffect} from "react";
import {Suspense} from "react";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import GradeRank from "../components/GradeRank"
import StudyingHoursRank from "../components/StudyingHoursRank"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  defaultYearAtom,
  HardwareType,
  maxCourseLoadNumAtom, NextLoadNumPerStep,
  selectedCourseDataAtom,
  summaryByStartYearAtom,
  userHardWareTypeAtom, validCourseNumAtom
} from "../0.Recoil/summaryState";
import MainBanner from "../components/MainBanner";
import '../App.css';
import CourseDetailPanel from "../components/CourseDetailPanel";
import CourseFilter from "../components/CourseFilter";
import Button from "@mui/material/Button";

export default function HomeWrapper() {
  return (
    <div>
      <PageHeader/>
      <Home/>
      <PageFooter/>
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
      <Box onClick={() => handleClickBackground()} style={{display:'flex', flexDirection:'column', position:'relative', width:'100%'}}>
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
  const validCourseNum = useRecoilValue(validCourseNumAtom)
  const [maxCourseLoadNum, setMaxCourseLoadNum] = useRecoilState(maxCourseLoadNumAtom)

  function handleLoadMore() {
    if (maxCourseLoadNum < validCourseNum)
      setMaxCourseLoadNum(maxCourseLoadNum + NextLoadNumPerStep)
  }

  return (
    <Box style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Box style={{flex:1, display:'flex'}}>
        <Box style={{display:'flex', flex:"1"}}>
          <GradeRank data={summary.data}/>
        </Box>
        <Box style={{display:'flex', flex:"1"}}>
          <StudyingHoursRank data={summary.data}/>
        </Box>
      </Box>
      <Box style={{display:'flex', flex:0}}>
        <Box style={{flex:1}}/>
        {
          (maxCourseLoadNum < validCourseNum) &&
          <Button onClick={() => handleLoadMore()} variant="text" sx={{fontSize:'1.2rem', flex: '0 0 10rem', marginTop:'3rem'}}>LOAD MORE</Button>
        }
        <Box style={{flex:1}}/>
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


function PageFooter() {
  return (
    <>
      <Box style={{display:'flex', position:'relative', height:'20rem', marginTop:'5rem', width:'100%', backgroundColor:'gray'}}>
        <Box></Box>
      </Box>
    </>
  );
}
