import Box from "@mui/material/Box";
import React, {useMemo} from "react";
import SummaryBarChart from "./SummaryBarChart";
import {useRecoilValue} from "recoil";
import {gradeRankAtom, selectedCourseDataAtom, studyingHoursRankAtom} from "../0.Recoil/summaryState";


export default function CourseDetailPanel() {
  const selectedCourseData = useRecoilValue(selectedCourseDataAtom);
  const gradeRank = useRecoilValue(gradeRankAtom);
  const studyingHoursRank = useRecoilValue(studyingHoursRankAtom);

  const gradeData = useMemo(() => {
    const rank = gradeRank[selectedCourseData.name]
    let data = [[`Grade [#${rank}]` , "%"]]
    for (let key of Object.keys(selectedCourseData["Grade"])) {
      data.push([key, selectedCourseData["Grade"][key]])
    }
    return data
  }, [gradeRank, selectedCourseData])

  const studyingHoursData = useMemo(() => {
    const rank = studyingHoursRank[selectedCourseData.name]
    let data = [[`Hours [#${rank}]`, "%"]]
    for (let key of Object.keys(selectedCourseData["StudyingHours"])) {
      data.push([key, selectedCourseData["StudyingHours"][key]])
    }
    return data
  }, [studyingHoursRank, selectedCourseData])

  if (!selectedCourseData) {
    return <></>
  }

  console.log(gradeData)

  return (
    <Box style={{position:'fixed', display:'flex', flexDirection:'column', bottom:0, left: '50%', transform: 'translateX(-50%)', width:'98vw', height:'35vh', justifyContent:'center'}}>
      <Box style={{display:'flex', flex:'0', fontSize:"1.6rem", fontWeight:'600', justifyContent:'center'}}>
        <Box style={{flex:0.1, padding: 5, marginBottom: 4, borderRadius:'10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', backgroundColor:'white'}}>
          {selectedCourseData.name}
        </Box>
      </Box>
      <Box style={{display:'flex', flex:'1', bottom:0, width:'100%', height:'100%',  borderRadius:'5px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', backgroundColor:'white'}}>
        <Box style={{display:'flex', justifyContent:'center', alignItems:'center', flex:1, margin:4}}>
          <Box style={{flex:1}}>
            <SummaryBarChart data={gradeData}/>
          </Box>
        </Box>
        <Box style={{display:'flex', justifyContent:'center', alignItems:'center', flex:1, margin:4}}>
          <Box style={{flex:1, backgroundColor:'red'}}>
            <SummaryBarChart data={studyingHoursData}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
