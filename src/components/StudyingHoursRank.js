import Box from "@mui/material/Box";
import {useMemo, useEffect} from "react";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "./Rank";
import {filteredMajorsAtom, filteredSBCsAtom, studyingHoursRankAtom} from "../0.Recoil/summaryState";
import {useRecoilValue, useSetRecoilState} from "recoil";
import FilterHelper from "../Calculation/FilterHelper";


export default function CourseRank({data}) {
  const setStudyingHoursRank = useSetRecoilState(studyingHoursRankAtom)
  const filteredMajors = useRecoilValue(filteredMajorsAtom)
  const filteredSBCs = useRecoilValue(filteredSBCsAtom);


  const avgSortedByStudyingHour = useMemo(() => {
    return SortingHelper.sortByStudyingHour(data)
  }, [data])

  const majorFiltered = useMemo(() => {
    return FilterHelper.filterByMajor(avgSortedByStudyingHour, filteredMajors)
  }, [avgSortedByStudyingHour, filteredMajors])

  const sbcFiltered = useMemo(() => {
    return FilterHelper.filterBySBC(avgSortedByStudyingHour, filteredSBCs)
  }, [avgSortedByStudyingHour, filteredSBCs])

  const avgData = useMemo(() => {
    return FilterHelper.getIntersectionOfData(majorFiltered, sbcFiltered)
  }, [majorFiltered, sbcFiltered])


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
