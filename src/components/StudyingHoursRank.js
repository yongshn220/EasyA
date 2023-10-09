import Box from "@mui/material/Box";
import {useMemo, useEffect} from "react";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "./Rank";
import {filteredMajorsAtom, studyingHoursRankAtom} from "../0.Recoil/summaryState";
import {useRecoilValue, useSetRecoilState} from "recoil";


export default function CourseRank({data}) {
  const setStudyingHoursRank = useSetRecoilState(studyingHoursRankAtom)
  const filteredMajors = useRecoilValue(filteredMajorsAtom)

  const avgSortedByGrade = useMemo(() => {
    return SortingHelper.sortByStudyingHour(data)
  }, [data])

  const avgData = useMemo(() => {
    return avgSortedByGrade.filter((course) => !filteredMajors.includes(course.name.substring(0, 3)))
  }, [avgSortedByGrade, filteredMajors])

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
