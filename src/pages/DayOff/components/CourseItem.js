import {COLOR} from "../../../util/util";
import Box from "@mui/material/Box";


export default function CourseItem({id, title, daytime, building}) {
  return (
    <Box style={{display:'flex', height:'5rem', backgroundColor:COLOR.default, borderRadius:'5px', marginBottom:'1rem', color:'black'}}>
      <div style={{display:'flex', flexDirection:'column', flex:1}}>
        <div style={{display:'flex', alignItems:'center', marginLeft:'1rem', marginRight:'1rem', fontSize:'1.2rem', fontWeight:'800', flex:1}}>
          {id}
        </div>
        <div style={{display:'flex', alignItems:'center', marginLeft:'1rem', marginRight:'1rem', fontSize:'1.2rem', fontWeight:'600', flex:1}}>
          {title}
        </div>
      </div>
      <div style={{display:'flex', flexDirection:'column', flex:1}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'right', marginLeft:'1rem', marginRight:'1rem', fontSize:'1.2rem', fontWeight:'600', flex:1}}>
          {daytime}
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'right', marginLeft:'1rem', marginRight:'1rem', fontSize:'1.2rem', fontWeight:'600', flex:1}}>
          {building}
        </div>
      </div>
    </Box>
  )
}
