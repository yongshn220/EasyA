import Box from "@mui/material/Box";
import {useEffect, useMemo} from "react";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "./Rank";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {filteredLevelsAtom, filteredMajorsAtom, filteredSBCsAtom, gradeRankAtom} from "../0.Recoil/summaryState";
import FilterHelper from '../Calculation/FilterHelper'

export default function GradeRank({data}) {
  const setGradeRank = useSetRecoilState(gradeRankAtom);
  const filteredMajors = useRecoilValue(filteredMajorsAtom);
  const filteredSBCs = useRecoilValue(filteredSBCsAtom);
  const filteredLevels = useRecoilValue(filteredLevelsAtom);

  const avgSortedByGrade = useMemo(() => {
    let sortedCourses = SortingHelper.sortByGrade(data)
    sortedCourses.forEach((course, index) => {
      course["_id"] = index // sort order for later use for filtering.
    })
    return sortedCourses
  }, [data])

  const majorFiltered = useMemo(() => {
    return FilterHelper.filterByMajor(avgSortedByGrade, filteredMajors)
  }, [avgSortedByGrade, filteredMajors])

  const sbcFiltered = useMemo(() => {
    return FilterHelper.filterBySBC(avgSortedByGrade, filteredSBCs)
  }, [avgSortedByGrade, filteredSBCs])

  const levelFiltered = useMemo(() => {
    return FilterHelper.filterByLevel(avgSortedByGrade, filteredLevels)
  }, [avgSortedByGrade, filteredLevels])

  const avgData = useMemo(() => {
    return FilterHelper.getIntersectionOfData(majorFiltered, sbcFiltered, levelFiltered)
  }, [majorFiltered, sbcFiltered, levelFiltered])


  useEffect(() => {
    let rank = {}
    avgData.forEach((data, index) => {
      rank[data.name] = index + 1
    })
    setGradeRank(rank);
  }, [setGradeRank, avgData])

  return (
    <Box style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Rank title={"Highest A's"} avgData={avgData} rankType={"Grade"}/>
    </Box>
  )
}
