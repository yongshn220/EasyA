import Box from "@mui/material/Box";
import BasicCard from "./BasicCard";
import Grid from '@mui/material/Grid';
import {useEffect, useMemo, useState} from "react";
import Calculator from "../Calculation/calculation";
import {COURSE_DATA} from "../data/courseEvalData";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "./Rank";


export default function CourseRank() {

  const [ignoreMajors, setIgnoreMajors] = useState()
  const [startYear, setStartYear] = useState()

  const courseAvgData = useMemo(() => {
    return Calculator.getSummaryWithOption(COURSE_DATA, ["ARH", "ARS"], 2020)
  }, [])

  const avgSortedByGrade = useMemo(() => {
    return SortingHelper.sortByGrade(courseAvgData)
  }, [courseAvgData])

  console.log(avgSortedByGrade)

  return (
    <Box style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Rank title={"Easy Grade"} avgData={avgSortedByGrade}/>
    </Box>
  )
}
