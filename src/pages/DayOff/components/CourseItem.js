import {COLOR} from "../../../util/util";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';

export default function CourseItem({fullId, title, daytime, building, onRemoveCallback}) {


  return (
    <Box style={{display:'flex', alignItems:'center', height:'5rem', backgroundColor:COLOR.default, borderRadius:'5px', marginBottom:'1rem', color:'black'}}>
      <div style={{display:'flex', flexDirection:'column', flex:1}}>
        <div style={{display:'flex', alignItems:'center', marginLeft:'1rem', marginRight:'1rem', fontSize:'1.2rem', fontWeight:'800', flex:1}}>
          {fullId}
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
      <DeleteIcon onClick={() => onRemoveCallback(fullId)} sx={{fontSize:'2rem', cursor:'pointer'}}/>
    </Box>
  )
}
