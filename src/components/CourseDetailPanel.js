import Box from "@mui/material/Box";
import React, {useMemo} from "react";
import SummaryBarChart from "./SummaryBarChart";
import {useRecoilState, useRecoilValue} from "recoil";
import {
  gradeRankAtom, HardwareType,
  selectedCourseDataAtom,
  studyingHoursRankAtom,
  userHardWareTypeAtom
} from "../0.Recoil/summaryState";


export default function CourseDetailPanel() {
  const [selectedCourseData, setSelectedCourseData] = useRecoilState(selectedCourseDataAtom);
  const gradeRank = useRecoilValue(gradeRankAtom);
  const studyingHoursRank = useRecoilValue(studyingHoursRankAtom);
  const userHardWareType = useRecoilValue(userHardWareTypeAtom);

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
  const GraphPanelHeight = (userHardWareType === HardwareType.MOBILE)? '85vh' : '35vh'

  if (!selectedCourseData) {
    return <></>
  }

  function handleGraphPanelClick(e) {
    e.stopPropagation();
    setSelectedCourseData(null);
  }

  return (
    <Box onClick={(e) => handleGraphPanelClick(e)} style={{position:'fixed', display:'flex', flexDirection:'column', bottom:0, left: '50%', transform: 'translateX(-50%)', width:'98vw', height: GraphPanelHeight, justifyContent:'center', zIndex:1000}}>
      <Box style={{display:'flex', flex:'0', fontSize:"1.6rem", fontWeight:'600', justifyContent:'center'}}>
        <Box style={{flex:0.1, padding: 5, marginBottom: 4, borderRadius:'10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', backgroundColor:'white', color:'black'}}>
          {selectedCourseData.name}
        </Box>
      </Box>
      <Box style={{display:'flex', flex:'1', flexDirection: GraphDirection, bottom:0, width:'100%', height:'100%',  borderRadius:'5px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', backgroundColor:'white'}}>
        <Box style={{display:'flex', justifyContent:'center', alignItems:'center', flex:1, margin:4}}>
          <Box style={{flex:1}}>
            <SummaryBarChart data={gradeData} options={{title: `Grade [#${gradeRank[selectedCourseData.name]}]`}}/>
          </Box>
        </Box>
        <Box style={{display:'flex', justifyContent:'center', alignItems:'center', flex:1, margin:4}}>
          <Box style={{flex:1, backgroundColor:'red'}}>
            <SummaryBarChart data={studyingHoursData} options={{title: `Studying Hours [#${studyingHoursRank[selectedCourseData.name]}]`}}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
