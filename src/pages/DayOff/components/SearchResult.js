import {styled} from "@mui/material/styles";
import SearchResultTable from "./SearchResultTable"
import React, {useEffect, useMemo, useState} from "react";
import {isObjEmpty} from "./SearchCalculationHelper";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PopupMessage from "../../../components/PopupMessage";
import {dayOffPopupMessageAtom} from "./DayOffState";
import {useSetRecoilState} from "recoil";

function getLectureCombinations(lectures) {
  let lectureCombinations = []

  for (let lec of lectures) {
    let recs = lec["availableREC"]?? []
    let labs = lec["availableLAB"]?? []
    if (isObjEmpty(lec["REC"]) && isObjEmpty(lec["LAB"])) {
      lectureCombinations.push ({
        combinationType: "NONE",
        lecId: lec["id"],
        lecDay: lec["day"],
        lecTime: lec["time"],
        lecInstructor: lec["instructor"],
        lecBuilding: lec["building"],
      })
    }
    else if (!isObjEmpty(lec["REC"]) && recs.length > 0) {
      for (let rec of recs) {
        lectureCombinations.push({
          combinationType: "REC",
          lecId: lec["id"],
          lecDay: lec["day"],
          lecTime: lec["time"],
          lecInstructor: lec["instructor"],
          lecBuilding: lec["building"],
          recId: rec["id"],
          recDay: rec["day"],
          recTime: rec["time"],
        })
      }
    }
    else if (!isObjEmpty(lec["LAB"]) && labs.length > 0) {
      for (let lab of labs) {
        lectureCombinations.push({
          combinationType: "LAB",
          lecId: lec["id"],
          lecDay: lec["day"],
          lecTime: lec["time"],
          lecInstructor: lec["instructor"],
          lecBuilding: lec["building"],
          labId: lab["id"],
          labDay: lab["day"],
          labTime: lab["time"],
        })
      }
    }
  }
  return lectureCombinations
}

export default function SearchResult({courses}) {
  const [isOpen, setOpen] = useState(false)
  const setPopupMessage = useSetRecoilState(dayOffPopupMessageAtom)

  const tableData = useMemo(() => {
    return courses.map(course => {
      let lectureCombinations = getLectureCombinations(course["LEC"])

      return {
        id: course.id + course.number,
        title: course.title,
        averageGradeA: 60,
        averageStudyingHours: 4,
        lectureCombinations: lectureCombinations
      }
    })
  }, [courses])

  useEffect(() => {
    if (tableData.length > 0) {
      setOpen(true)
    }
  }, [tableData])

  function handleToggleButtonClick() {
    if (tableData.length === 0) {
      return setPopupMessage({
        message: "No available search results.",
        state: true,
        severity: 'info'
      })
    }
    setOpen(!isOpen)
  }

  return (
    <div style={{
      position:'fixed',
      bottom:0,
      height: (isOpen)? '30vh' : '0vh',
      width:'100vw',
      zIndex:100
    }}>
      <ToggleButton onClick={handleToggleButtonClick} sx={{cursor:'pointer', display:(tableData.length > 0)? 'block' : 'none'}}>
        {
          isOpen?
            <ExpandMoreIcon sx={{fontSize:'5rem'}}/>
            :
            <ExpandLessIcon sx={{fontSize:'5rem'}}/>
        }
      </ToggleButton>
      <BaseBox style={{bottom: (isOpen)? 0 : '-100vw'}}>
        <CourseItem>
          <SearchResultTable data={tableData}/>
        </CourseItem>
      </BaseBox>
    </div>
  )
}


const BaseBox = styled('div')({
  display:'flex',
  position:'fixed',
  bottom:0,
  height:'30vh',
  width:'100vw',
  borderRadius:'10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
  backgroundImage: `url('/graybg.jpeg')`,
  zIndex:2,
})


const CourseItem = styled('div')({
  flex:1,
  margin:'1rem',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
  width: 0,
    background: 'transparent',
  }
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
