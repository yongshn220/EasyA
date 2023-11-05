import WeeklyScheduler from "./WeeklyScheduler";
import Box from "@mui/material/Box";
import {COLOR} from "../../../util/util";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import SearchResult from "./SearchResult";
import {useRecoilValue} from "recoil";
import {addedCourseListAtom, selectedTimeSetAtom} from "./DayOffState";
import {coursesToTimeSet} from "./TimeCalculationHelper";
import {SearchAvailableCourses} from "./SearchCalculationHelper";

export default function DayOffMainContent() {
  const addedCourses = useRecoilValue(addedCourseListAtom);
  const selectedTimeSet = useRecoilValue(selectedTimeSetAtom);
  const [availableCourses, setAvailableCourses] = useState([])

  function handleSearchClick() {
    const courseTimeSet = coursesToTimeSet(addedCourses)
    const mergedTimeSet = new Set([...courseTimeSet, ...selectedTimeSet]);
    const _availableCourses = SearchAvailableCourses(mergedTimeSet)
    setAvailableCourses(_availableCourses)
    console.log(_availableCourses)
  }

  return (
    <Box style={{display:'flex', flexDirection:'column', justifyContent:'center', marginTop:'40px'}}>
      <Box style={{marginLeft:"40px", marginRight:'40px', marginBottom:'10px', fontSize:'2rem', fontWeight:'500', textAlign:'left'}}>
        Set the time you want to keep empty! <span style={{fontWeight:'700', fontSize:'2.5rem', color:COLOR.yellow}}>Drag or select!</span>
      </Box>
      <WeeklyScheduler/>
      <Box style={{marginLeft:"40px", marginRight:'40px',marginTop:'40px', marginBottom:'2px', fontSize:'2rem', fontWeight:'500', textAlign:'left'}}>
        Ready? <span style={{fontWeight:'700', fontSize:'2.5rem', color:COLOR.yellow}}>Press the button!</span>
      </Box>
      <Box style={{display:'flex', marginLeft:"40px", marginRight:'40px', marginTop:'10px'}}>
        <Button
          variant="contained"
          onClick={handleSearchClick}
          sx={{
            flex:1,
            fontSize:'1.2rem',
            backgroundColor: COLOR.yellow, // Change this to your desired background color
            '&:hover': {
              backgroundColor: COLOR.lightYellow, // Change this for the hover effect
            },
          }}
        >GO SEARCH</Button>
      </Box>
      <SearchResult courses={availableCourses}/>
    </Box>
  )
}
