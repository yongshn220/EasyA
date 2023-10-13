import React, {useEffect} from "react";
import {Suspense} from "react";
import Box from "@mui/material/Box";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  HardwareType,
  selectedCourseDataAtom,
  userHardWareTypeAtom
} from "../0.Recoil/summaryState";
import MainBanner from "../components/MainBanner";
import '../App.css';
import CourseDetailPanel from "../components/CourseDetailPanel";
import CourseFilter from "../components/CourseFilter";
import MainContent from "../components/MainContent"

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
      <Box onClick={() => handleClickBackground()} style={{display:'flex', flexDirection:'column', position:'relative', width:'100%', backgroundImage: `url('/graybg.jpeg')`}}>
        <Box style={{display:'flex', flex:"0 0 350px", flexDirection:'column', justifyContent:'center'}}>
          <MainBanner/>
        </Box>
        <Box style={{display:'flex', flex:'0 0 350px', marginTop:'20px', marginBottom:'40px', justifyContent:'center'}}>
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

function PageHeader() {
  return (
    <>
      <Box style={{display:'flex', position:'relative', height:'50px', width:'100%', backgroundImage: `url('/graybg.jpeg')` }}>
        <Box style={{display:'flex', flex: '0', width: "100vw", marginLeft:'1vw', justifyContent:'center', alignItems:'center', fontSize:'1.6rem', fontWeight:'700'}}>SBU@EasyA</Box>
      </Box>
    </>
  );
}


function PageFooter() {
  return (
    <>
      <Box style={{display:'flex', position:'relative', height:'20rem', paddingTop:'5rem', width:'100%', backgroundImage: `url('/graybg.jpeg')` }}>
      </Box>
    </>
  );
}
