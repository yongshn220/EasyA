import {COLOR} from "../../../util/util";
import Box from "@mui/material/Box";


export default function CourseItem({id, title, daytime, building}) {
  return (
    <Box style={{display:'flex', height:'5rem', backgroundColor:COLOR.default, borderRadius:'5px', marginBottom:'1rem', color:'black'}}>
      <div style={{display:'flex', flexDirection:'column', flex:1}}>
        <div style={{display:'flex', alignItems:'center', marginLeft:'1rem', marginRight:'1rem', fontSize:'1.2rem', fontWeight:'800', flex:1}}>
          CSE114-01
        </div>
        <div style={{display:'flex', alignItems:'center', marginLeft:'1rem', marginRight:'1rem', fontSize:'1.2rem', fontWeight:'600', flex:1}}>
          Intro to Object-Oriented Program
        </div>
      </div>
      <div style={{display:'flex', flexDirection:'column', flex:1}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'right', marginLeft:'1rem', marginRight:'1rem', fontSize:'1.2rem', fontWeight:'600', flex:1}}>
          TU TH 8:30am - 9:50am
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'right', marginLeft:'1rem', marginRight:'1rem', fontSize:'1.2rem', fontWeight:'600', flex:1}}>
          Light Engineering 102
        </div>
      </div>
    </Box>
  )
}
