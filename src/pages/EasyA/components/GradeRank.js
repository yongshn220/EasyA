import Box from "@mui/material/Box";
import {useEffect, useMemo} from "react";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "../pages/EasyA/components/Rank";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
  currentFilteredDataAtom,
  filteredLevelsAtom,
  filteredMajorsAtom,
  filteredSBCsAtom,
  gradeRankAtom,
  selectedCourseSizeAtom,
  validCourseNumAtom
} from "../0.Recoil/easyAState";
import FilterHelper from '../Calculation/FilterHelper'

export default function GradeRank({data}) {
  const setValidCourseNum = useSetRecoilState(validCourseNumAtom);
  const [gradeRank, setGradeRank] = useRecoilState(gradeRankAtom);
  const setCurrentFilteredData = useSetRecoilState(currentFilteredDataAtom)
  const filteredMajors = useRecoilValue(filteredMajorsAtom);
  const filteredSBCs = useRecoilValue(filteredSBCsAtom);
  const filteredLevels = useRecoilValue(filteredLevelsAtom);
  const courseSize = useRecoilValue(selectedCourseSizeAtom);


  const avgSortedByGrade = useMemo(() => {
    let sortedCourses = SortingHelper.sortByGrade(data)
    sortedCourses.forEach((course, index) => {
      course["_id"] = index // sort order for later use for filtering.
    })
    return sortedCourses
  }, [data])

  useEffect(() => {
    setValidCourseNum(avgSortedByGrade.length)
  }, [setValidCourseNum, avgSortedByGrade])

  const majorFiltered = useMemo(() => {
    return FilterHelper.filterByMajor(avgSortedByGrade, filteredMajors)
  }, [avgSortedByGrade, filteredMajors])

  const sbcFiltered = useMemo(() => {
    return FilterHelper.filterBySBC(avgSortedByGrade, filteredSBCs)
  }, [avgSortedByGrade, filteredSBCs])

  const levelFiltered = useMemo(() => {
    return FilterHelper.filterByLevel(avgSortedByGrade, filteredLevels)
  }, [avgSortedByGrade, filteredLevels])

  const courseSizeFiltered = useMemo(() => {
    return FilterHelper.filterByCourseSize(avgSortedByGrade, courseSize)
  }, [avgSortedByGrade, courseSize])

  const avgData = useMemo(() => {
    return FilterHelper.getIntersectionOfData(majorFiltered, sbcFiltered, levelFiltered, courseSizeFiltered)
  }, [majorFiltered, sbcFiltered, levelFiltered, courseSizeFiltered])

  useEffect(() => {
    let rank = {}
    avgData.forEach((data, index) => {
      rank[data.name] = index + 1
    })
    setGradeRank(rank);
    setCurrentFilteredData(avgData)
  }, [setCurrentFilteredData, setGradeRank, avgData])


  return (
    <Box style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Rank title={"Highest A's"} avgData={avgData} rankType={"Grade"} rankData={gradeRank}/>
    </Box>
  )
}
