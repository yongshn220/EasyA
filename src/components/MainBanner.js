import Box from "@mui/material/Box";
import StartYearMenu from "./StartYearMenu";
import {defaultYearAtom} from "../0.Recoil/summaryState";
import {useRecoilValue} from "recoil";


export default function MainBanner() {
  const startYear = useRecoilValue(defaultYearAtom);

  return (
    <Box style={{flex: 1}}>
      <Box style={{margin:10, fontSize:'10rem', fontWeight:'700'}}>Find EASY A course</Box>
      <Box style={{margin:20, fontSize:'2.5rem', fontWeight:'700'}}>Average<br />Between</Box>
      <Box style={{margin:20, fontSize:'5rem', fontWeight:'700'}}>{startYear}~2023</Box>
      <StartYearMenu/>
    </Box>
  )
}
