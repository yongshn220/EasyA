import Box from "@mui/material/Box";
import {useMemo} from "react";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "./Rank";
import {studyingHoursRankAtom} from "../0.Recoil/summaryState";
import {useSetRecoilState} from "recoil";


export default function CourseRank({data}) {
  const setStudyingHoursRank = useSetRecoilState(studyingHoursRankAtom)

  const avgSortedByGrade = useMemo(() => {
    const arr = SortingHelper.sortByStudyingHour(data)

    let rank = {}
    arr.forEach((data, index) => {
      rank[data.name] = index + 1
    })
    setStudyingHoursRank(rank);

    return arr
  }, [setStudyingHoursRank, data])


  return (
    <Box style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Rank title={"Minimum Studying Hours"} avgData={avgSortedByGrade} rankType={"StudyingHours"}/>
    </Box>
  )
}
