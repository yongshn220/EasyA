import Box from "@mui/material/Box";
import StartYearMenu from "./StartYearMenu";
import {defaultYearAtom} from "../../../0.Recoil/easyAState";
import {useRecoilValue} from "recoil";
import {COLOR} from "../../../util/util";
import InfoIcon from '@mui/icons-material/Info';

export default function MainBanner() {
  const startYear = useRecoilValue(defaultYearAtom);

  return (
    <Box style={{flex: 1}}>
      <Box style={{margin:10, fontSize:'10rem', fontWeight:'700'}}>Find <span style={{ color: COLOR.yellow }}>Easy-A</span> Course</Box>
      <Box style={{margin:20, fontSize:'2.0rem', fontWeight:'700',}}>Average<br />Between</Box>
      <Box style={{margin:20, fontSize:'5rem', fontWeight:'700'}}>{startYear}~2023</Box>
      <StartYearMenu/>
      <Box style={{position:'relative', margin:20, fontSize:'1.2rem', fontWeight:'700', color:"#b2b2b2"}}>
        <InfoIcon style={{paddingRight: 5}}/>
        Summer and Winder courses are excluded in the calculation.
      </Box>
    </Box>
  )
}
