import {useRecoilState, useRecoilValue} from "recoil";
import {
  courseInfoAtom,
  defaultYearAtom,
  maxCourseLoadNumAtom, NextLoadNumPerStep,
  summaryByStartYearAtom,
  validCourseNumAtom
} from "../0.Recoil/summaryState";
import Box from "@mui/material/Box";
import GradeRank from "./GradeRank";
import StudyingHoursRank from "./StudyingHoursRank";
import Button from "@mui/material/Button";
import React from "react";
import {COLOR} from "../util/util";
import CourseSearchBar from "./CourseSearchBar";

export default function MainContent() {
  const courseInfo = useRecoilValue(courseInfoAtom) // Preloading.
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
      <Box style={{flex:0, display:'flex', justifyContent:'center', marginBottom:'3rem', marginTop:'2rem'}}>
        <Box style={{flex:'1', display:'flex', marginLeft: 40, marginRight: 40}}>
          <CourseSearchBar/>
        </Box>
      </Box>
      <Box style={{flex:1, display:'flex'}}>
        <Box style={{display:'flex', flex:"1", marginLeft: 40, marginRight: 40}}>
          <GradeRank data={summary.data}/>
        </Box>
        <Box style={{display:'flex', flex:"1", marginLeft: 40, marginRight: 40}}>
          <StudyingHoursRank data={summary.data}/>
        </Box>
      </Box>
      <Box style={{display:'flex', flex:0}}>
        <Box style={{flex:1}}/>
        {
          (maxCourseLoadNum < validCourseNum) &&
          <Button onClick={() => handleLoadMore()} variant="text" sx={{fontSize:'1.2rem', flex: '0 0 10rem', marginTop:'3rem', color:COLOR.yellow}}>LOAD MORE</Button>
        }
        <Box style={{flex:1}}/>
      </Box>
    </Box>
  )
}

