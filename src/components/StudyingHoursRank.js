import Box from "@mui/material/Box";
import {useMemo} from "react";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "./Rank";


export default function CourseRank({data}) {

  const avgSortedByGrade = useMemo(() => {
    return SortingHelper.sortByStudyingHour(data)
  }, [data])


  return (
    <Box style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Rank title={"Minimum Studying Hours"} avgData={avgSortedByGrade} rankType={"StudyingHours"}/>
    </Box>
  )
}
