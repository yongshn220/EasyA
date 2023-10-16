import {useRecoilState, useRecoilValue} from "recoil";
import {
  defaultYearAtom,
  maxCourseLoadNumAtom, NextLoadNumPerStep,
  summaryByStartYearAtom,
  validCourseNumAtom
} from "../0.Recoil/summaryState";
import Box from "@mui/material/Box";
import GradeRank from "./GradeRank";
import StudyingHoursRank from "./StudyingHoursRank";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {COLOR} from "../util/util";
import CourseSearchBar from "./CourseSearchBar";

const RankType = {
  GRADE: "grade",
  MSH: "minimumStudyingHours"
}

export default function MainContentMobile() {
  const currentYear = useRecoilValue(defaultYearAtom);
  const summary = useRecoilValue(summaryByStartYearAtom(currentYear))
  const validCourseNum = useRecoilValue(validCourseNumAtom)
  const [maxCourseLoadNum, setMaxCourseLoadNum] = useRecoilState(maxCourseLoadNumAtom)
  const [rankType, setRankType] = useState(RankType.GRADE)

  function handleLoadMore() {
    if (maxCourseLoadNum < validCourseNum)
      setMaxCourseLoadNum(maxCourseLoadNum + NextLoadNumPerStep)
  }

  function handleChangeRankType(rankType) {
    setRankType(rankType)
  }

  return (
    <Box style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Box style={{flex:0, display:'flex', justifyContent:'center', marginBottom:'3rem', marginTop:'2rem'}}>
        <Box style={{flex:'1', display:'flex', marginLeft: 40, marginRight: 40}}>
          <CourseSearchBar/>
        </Box>
      </Box>
      <Box style={{flex: 0, display:'flex', justifyContent:'center',  marginLeft: 40, marginRight: 40, marginTop:20}}>
        <Box style={{flex:1}}>
          <Button fullWidth variant="contained"
            sx={{
              fontSize:'1.2rem',
              backgroundColor: COLOR.yellow,
              marginRight:'1rem',
              '&:hover': { backgroundColor: COLOR.lightYellow}
            }}
            onClick={() => handleChangeRankType(RankType.GRADE)}
          >Highest A</Button>
        </Box>
        <Box style={{flex:1}}>
          <Button fullWidth variant="contained"
            sx={{
              fontSize:'1.2rem',
              backgroundColor: COLOR.yellow,
              marginLeft:'1rem',
              '&:hover': { backgroundColor: COLOR.lightYellow}
            }}
            onClick={() => handleChangeRankType(RankType.MSH)}
          >Min Studying Hours</Button>
        </Box>
      </Box>
      <Box style={{flex:1, display:'flex', flexDirection:'column'}}>
        {
          (rankType === RankType.GRADE)?
          <Box style={{display:'flex', flex:"1", marginLeft: 40, marginRight: 40}}>
            <GradeRank data={summary.data}/>
          </Box>
            :
          <Box style={{display:'flex', flex:"1", marginLeft: 40, marginRight: 40}}>
            <StudyingHoursRank data={summary.data}/>
          </Box>
        }
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

