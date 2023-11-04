import WeeklyScheduler from "./WeeklyScheduler";
import Box from "@mui/material/Box";


export default function DayOffMainContent() {
  return (
    <Box style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
      <WeeklyScheduler/>
    </Box>
  )
}
