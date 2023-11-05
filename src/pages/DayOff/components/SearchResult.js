import {styled} from "@mui/material/styles";
import SearchResultTable from "./SearchResultTable"
import React, {useMemo} from "react";
import {isObjEmpty} from "./SearchCalculationHelper";


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

  const tableData = useMemo(() => {
    return courses.map(course => {
      let lectureCombinations = getLectureCombinations(course["LEC"])

      return {
        id: course.id + " " + course.number,
        title: course.title,
        averageGradeA: 60,
        averageStudyingHours: 4,
        lectureCombinations: lectureCombinations
      }
    })
  }, [courses])
  return (
    <BaseBox>
      <CourseItem>
        <SearchResultTable data={tableData}/>
      </CourseItem>
    </BaseBox>
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
  zIndex:100,
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
