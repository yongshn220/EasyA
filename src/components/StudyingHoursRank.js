import Box from "@mui/material/Box";
import {useMemo, useEffect} from "react";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "./Rank";
import {
  filteredLevelsAtom,
  filteredMajorsAtom,
  filteredSBCsAtom,
  selectedCourseSizeAtom,
  studyingHoursRankAtom
} from "../0.Recoil/summaryState";
import {useRecoilValue, useSetRecoilState} from "recoil";
import FilterHelper from "../Calculation/FilterHelper";


export default function StudyingHoursRank({data}) {
  const setStudyingHoursRank = useSetRecoilState(studyingHoursRankAtom)
  const filteredMajors = useRecoilValue(filteredMajorsAtom)
  const filteredSBCs = useRecoilValue(filteredSBCsAtom);
  const filteredLevels = useRecoilValue(filteredLevelsAtom);
  const courseSize = useRecoilValue(selectedCourseSizeAtom);


  const avgSortedByStudyingHour = useMemo(() => {
    let sortedCourses = SortingHelper.sortByStudyingHour(data)
    sortedCourses.forEach((course, index) => {
      course["_id"] = index // sort order for later use for filtering.
    })
    return sortedCourses
  }, [data])

  const majorFiltered = useMemo(() => {
    return FilterHelper.filterByMajor(avgSortedByStudyingHour, filteredMajors)
  }, [avgSortedByStudyingHour, filteredMajors])

  const sbcFiltered = useMemo(() => {
    return FilterHelper.filterBySBC(avgSortedByStudyingHour, filteredSBCs)
  }, [avgSortedByStudyingHour, filteredSBCs])

  const levelFiltered = useMemo(() => {
    return FilterHelper.filterByLevel(avgSortedByStudyingHour, filteredLevels)
  }, [avgSortedByStudyingHour, filteredLevels])

  const courseSizeFiltered = useMemo(() => {
    return FilterHelper.filterByCourseSize(avgSortedByStudyingHour, courseSize)
  }, [avgSortedByStudyingHour, courseSize])

  const avgData = useMemo(() => {
    return FilterHelper.getIntersectionOfData(majorFiltered, sbcFiltered, levelFiltered, courseSizeFiltered)
  }, [majorFiltered, sbcFiltered, levelFiltered, courseSizeFiltered])


  useEffect(() => {
    let rank = {}
    avgData.forEach((data, index) => {
      rank[data.name] = index + 1
    })
    setStudyingHoursRank(rank);
  }, [setStudyingHoursRank, avgData])


  return (
    <Box style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Rank title={"Minimum Studying Hours"} avgData={avgData} rankType={"StudyingHours"}/>
    </Box>
  )
}
