import LoadingAnimation from "./LoadingAnimation";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";

export default function LoadingBox() {

  return (
    <div>
      <LoadingAnimation/>
      <div style={{margin:10, fontSize:'4rem', fontWeight:'700'}}>
        Data is <span>Loading</span>
      </div>
      <div style={{margin:10, fontSize:'1.5rem', fontWeight:'700'}}>
        (Usually takes less than 10 seconds.)
      </div>
      <Box style={{position:'relative', margin:20, fontSize:'1.2rem', fontWeight:'700', color:"#b2b2b2"}}>
        <InfoIcon style={{paddingRight: 5}}/>
        Summer and Winder courses are excluded in the calculation.
      </Box>
    </div>
  )
}
