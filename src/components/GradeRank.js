import Box from "@mui/material/Box";
import {useEffect, useMemo} from "react";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "./Rank";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {filteredMajorsAtom, gradeRankAtom} from "../0.Recoil/summaryState";

export default function GradeRank({data}) {
  const setGradeRank = useSetRecoilState(gradeRankAtom);
  const filteredMajors = useRecoilValue(filteredMajorsAtom);

  const avgSortedByGrade = useMemo(() => {
    return SortingHelper.sortByGrade(data)
  }, [data])

  const avgData = useMemo(() => {
    return avgSortedByGrade.filter((course) => !filteredMajors.includes(course.name.substring(0, 3)))
  }, [avgSortedByGrade, filteredMajors])

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
