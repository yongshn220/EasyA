import Box from "@mui/material/Box";
import React, {Suspense, useMemo, useState} from "react";
import SummaryBarChart from "./SummaryBarChart";
import {useRecoilValue} from "recoil";
import {
  gradeRankAtom, HardwareType,
  selectedCourseDataAtom,
  studyingHoursRankAtom,
  userHardWareTypeAtom,
  courseInfoAtom, defaultYearAtom
} from "../../../0.Recoil/easyAState";
import {Divider} from "@mui/material";
import {styled} from "@mui/material/styles";
import {COLOR} from "../../../util/util";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CourseDetailProfessorTable from "./CourseDetailProfessorTable";


export default function CourseDetailPanel() {
  const selectedCourseData = useRecoilValue(selectedCourseDataAtom);
  const currentYear = useRecoilValue(defaultYearAtom)
  const gradeRank = useRecoilValue(gradeRankAtom);
  const studyingHoursRank = useRecoilValue(studyingHoursRankAtom);
  const userHardWareType = useRecoilValue(userHardWareTypeAtom);
  const courseInfo = useRecoilValue(courseInfoAtom)

  const [isFullView, setFullView] = useState(false)

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

  const GraphPanelHeight = useMemo(() => {
    if (isFullView) return '80vh'
    else return (userHardWareType === HardwareType.MOBILE)? '70vh' : '35vh'
  }, [isFullView, userHardWareType])

  const profId = `${selectedCourseData.name}_${currentYear}`
  const GraphDirection = (userHardWareType === HardwareType.MOBILE)? 'column' : 'row'
  const prerequisite = courseInfo[selectedCourseData.name]["prerequisite"]
  const advisoryPrerequisite = courseInfo[selectedCourseData.name]["advisory_prerequisite"]

  if (!selectedCourseData) {
    return <></>
  }


  function handleToggleButtonClick(e) {
    e.stopPropagation();
    setFullView(!isFullView)
  }

  return (
    <BaseBox pHeight={GraphPanelHeight}>
      <ToggleButton onClick={handleToggleButtonClick} sx={{cursor:'pointer'}}>
        {
          isFullView?
            <ExpandMoreIcon sx={{fontSize:'5rem'}}/>
            :
            <ExpandLessIcon sx={{fontSize:'5rem'}}/>
        }
      </ToggleButton>
      <Content>
        <Inner>
          <Box style={{position:'relative', top: 0, marginTop:'1rem'}}>
            <Box style={{fontWeight:'800', fontSize:'1.6rem', color:COLOR.yellow}}>{`${selectedCourseData.name.slice(0, 3)} ${selectedCourseData.name.slice(3, 6)}`}</Box>
            <Box style={{fontWeight:'600', fontSize:'1.6rem', paddingBottom:'1rem'}}>{selectedCourseData.fullName}</Box>
            {(prerequisite !== "") && <Box style={{fontWeight:'600', fontSize:'1.2rem'}}><span style={{color:COLOR.yellow}}>prerequisite</span>: {prerequisite}</Box>}
            {(advisoryPrerequisite !== "") && <Box style={{fontWeight: '600', fontSize: '1.2rem'}}><span style={{color:COLOR.yellow}}>advisory prerequisite</span>: {advisoryPrerequisite}</Box>}
            <Divider style={{marginTop:10, backgroundColor:'#606060'}}/>
          </Box>
          <Box style={{position:'relative', top: 0, display:'flex', height:'15vw', flexDirection:GraphDirection}}>
              <Box style={{diaplay:'flex', flex:1, justifyContent:'center'}}>
                <SummaryBarChart data={gradeData} options={{title: `Grade [#${gradeRank[selectedCourseData.name]}]`}}/>
              </Box>
              <Box style={{display:'flex', flex:"1",  justifyContent:'center'}}>
                <SummaryBarChart data={studyingHoursData} options={{title: `Studying Hours [#${studyingHoursRank[selectedCourseData.name]}]`}}/>
              </Box>
          </Box>
          <Box style={{marginLeft:"40px", marginRight:'40px',marginTop:'40px', marginBottom:'2px', fontSize:'2rem', fontWeight:'500', textAlign:'left'}}>
            Analyze By Professor <span style={{fontWeight:'700', fontSize:'2.5rem', color:COLOR.yellow}}>Click to see!</span>
          </Box>
          <Box style={{marginLeft:"40px", marginRight:'40px'}}>
            <Suspense fallback={<div>loading</div>}>
              <CourseDetailProfessorTable profId={profId}/>
            </Suspense>
          </Box>
          <Box style={{marginRight:'40px',marginTop:'100px', marginBottom:'20px', fontSize:'1.2rem', fontWeight:'500', textAlign:'center', color:COLOR.default}}>
            The data is collected from <span style={{color:COLOR.yellow}}>Spring {currentYear}</span> to current.
            <br/> Change the start year if you want previous data.
          </Box>
        </Inner>
      </Content>
    </BaseBox>
  )
}

const BaseBox = styled('div')(({pHeight}) => ({
  display:'flex',
  position:'fixed',
  bottom:0,
  height:pHeight,
  width:'100vw',
  zIndex:100,
}))

const Content = styled('div')(({pHeight}) => ({
  display:'flex',
  bottom:0,
  borderRadius:'10px',
  width:'100vw',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
  backgroundImage: `url('/graybg.jpeg')`,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
    background: 'transparent',
  },
  zIndex:2,
}))

const Inner = styled('div')({
  flex:1,
  fontSize:"1.6rem",
  fontWeight:'600',
  backgroundColor:'rgba(0,0,0,0.25)',
  margin:'1rem',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
    background: 'transparent',
  },
})

const ToggleButton = styled('div')({
  position:'absolute',
  top:'-4rem', left: '50%', transform: 'translateX(-50%)',
  height:'10rem', width:'10rem',
  borderRadius:'50px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
  backgroundImage: `url('/graybg.jpeg')`,
  zIndex:1,
})
