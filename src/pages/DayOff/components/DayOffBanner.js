import Box from "@mui/material/Box";
import {COLOR} from "../../../util/util";
import InfoIcon from "@mui/icons-material/Info";

export default function DayOffBanner() {

  return (
    <Box style={{flex: 1}}>
      <Box style={{margin:10, fontSize:'10rem', fontWeight:'700'}}>Make a <span style={{ color: COLOR.yellow }}>Day-Off</span></Box>
      <Box style={{margin:20, fontSize:'2.0rem', fontWeight:'700',}}>Find easy courses in the specific time!</Box>
      <Box style={{position:'relative', margin:20, fontSize:'1.2rem', fontWeight:'700', color:"#b2b2b2"}}>
        <InfoIcon style={{paddingRight: 5}}/>
        Currently only offline courses are available.
      </Box>
    </Box>
  )
}
