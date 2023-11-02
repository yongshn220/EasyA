import Box from "@mui/material/Box";
import React, {useMemo} from "react";
import SummaryBarChart from "./SummaryBarChart";
import {useRecoilState, useRecoilValue} from "recoil";
import {
  gradeRankAtom, HardwareType,
  selectedCourseDataAtom,
  studyingHoursRankAtom,
  userHardWareTypeAtom,
  courseInfoAtom
} from "../0.Recoil/easyAState";
import {Divider} from "@mui/material";


export default function CourseDetailPanel() {
  const [selectedCourseData, setSelectedCourseData] = useRecoilState(selectedCourseDataAtom);
  const gradeRank = useRecoilValue(gradeRankAtom);
  const studyingHoursRank = useRecoilValue(studyingHoursRankAtom);
  const userHardWareType = useRecoilValue(userHardWareTypeAtom);
  const courseInfo = useRecoilValue(courseInfoAtom)

  const gradeData = useMemo(() => {
    let data = [["", { role: "annotation" }, "%", { role: "annotation" }]]
    for (let key of Object.keys(selectedCourseData["Grade"])) {
      data.push([key, "", selectedCourseData["Grade"][key], selectedCourseData["Grade"][key]])
    }
    return data
  }, [selectedCourseData])

  const studyingHoursData = useMemo(() => {
    let data = [["", { role: "annotation" }, "%", { role: "annotation" }]]
    for (let key of Object.keys(selectedCourseData["StudyingHours"])) {
      data.push([key, "", selectedCourseData["StudyingHours"][key], selectedCourseData["StudyingHours"][key]])
    }
    return data
  }, [selectedCourseData])

  const GraphDirection = (userHardWareType === HardwareType.MOBILE)? 'column' : 'row'
  const GraphPanelHeight = (userHardWareType === HardwareType.MOBILE)? '70vh' : '35vh'
  const prerequisite = courseInfo[selectedCourseData.name]["prerequisite"]
  const advisoryPrerequisite = courseInfo[selectedCourseData.name]["advisory_prerequisite"]

  if (!selectedCourseData) {
    return <></>
  }

  function handleGraphPanelClick(e) {
    e.stopPropagation();
    setSelectedCourseData(null);
  }

  return (
    <Box onClick={(e) => handleGraphPanelClick(e)} style={{position:'fixed', display:'flex', flexDirection:'column', bottom:0, left: '50%', transform: 'translateX(-50%)', width:'98vw', height: GraphPanelHeight, justifyContent:'center', zIndex:1000, backgroundColor:'white', borderRadius:'10px'}}>
      <Box style={{display:'flex', flexDirection:'column', fontSize:"1.6rem", fontWeight:'600', justifyContent:'center'}}>
        <Box style={{flex:"1", backgroundColor:'rgba(255,255,255,1)', color:'black'}}>
          <Box style={{fontWeight:'800', fontSize:'1.6rem', color:'black'}}>{selectedCourseData.name}</Box>
          <Box style={{fontWeight:'600', fontSize:'1.6rem', color:'black', marginBottom:10}}>{selectedCourseData.fullName}</Box>
          {(prerequisite !== "") && <Box style={{fontWeight:'600', fontSize:'1.2rem', color:'#544f4f'}}>prerequisite: {prerequisite}</Box>}
          {(advisoryPrerequisite !== "") && <Box style={{fontWeight: '600', fontSize: '1.2rem', color: '#544f4f'}}>advisory prerequisite: {advisoryPrerequisite}</Box>}
          <Divider style={{marginTop:10}}/>
        </Box>
        <Box style={{display:'flex', flex:1, flexDirection:GraphDirection, backgroundColor:'white'}}>
          <Box style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
            <Box style={{display:'flex', flex:"1", justifyContent:'center', backgroundColor: 'white', color:'black'}}>
              <SummaryBarChart data={gradeData} options={{title: `Grade [#${gradeRank[selectedCourseData.name]}]`}}/>
            </Box>
          </Box>
          <Box style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
            <Box style={{display:'flex', flex:"1",  justifyContent:'center', backgroundColor: 'white', color:'black'}}>
              <SummaryBarChart data={studyingHoursData} options={{title: `Studying Hours [#${studyingHoursRank[selectedCourseData.name]}]`}}/>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
