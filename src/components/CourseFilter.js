import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import {useRecoilState, useRecoilValue} from "recoil";
import {filteredMajorsAtom, majorListAtom} from "../0.Recoil/summaryState";
import {useEffect} from "react";


export default function CourseFilter() {
  const majorList = useRecoilValue(majorListAtom);
  const [filteredMajors, setFilteredMajors] = useRecoilState(filteredMajorsAtom);

  useEffect(() => {
    console.log(filteredMajors);
  }, [filteredMajors])

  function handleClickMajor(e, major) {
    e.stopPropagation();

    if (filteredMajors.includes(major)) {
      setFilteredMajors(filteredMajors.filter((_major) => _major !== major));
    }
    else {
      setFilteredMajors([...filteredMajors, major])
    }
  }

  return (
    <Box style={{display:'flex', flexDirection:'column', flex:'1', marginLeft:40, marginRight:40, padding:20, borderRadius:'5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor:'white'}}>
      <Box style={{position:'absolute', fontSize:'1.6rem', fontWeight:'700'}}>
        Filter
      </Box>
      <Box style={{dispCourseFilterlay:'flex', flexDirection:'column', flex:1}}>
        <Box style={{flex:0, fontSize:'1.6rem', fontWeight:'600', color:'gray'}}>
          Majors
        </Box>
        <Box style={{flex:1, padding:'10px'}}>
          {
            majorList.map((major) => {
              const variant = (filteredMajors.includes(major))? "outlined" : "";
              return <Chip key={major} onClick={(e) => handleClickMajor(e, major)} label={major} color="primary" sx={{fontSize:'1.2rem', margin:'3px'}} variant={variant} />
            })
          }
          <Box style={{display:'flex', flex:1, flexDirection:'row', justifyContent:'center'}}>
            <Box style={{position:'relative', width:'100px', marginTop:10}}>Select All</Box>
            <Box style={{position:'relative', width:'100px', marginTop:10}}>Unselect All</Box>
          </Box>
        </Box>
      </Box>
      <Box style={{display:'flex', flexDirection:'column', flex:1}}>
        <Box style={{flex:0, fontSize:'1.6rem', fontWeight:'600', color:'gray'}}>
          SBCs
        </Box>
        <Box style={{display:'flex', flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Box style={{position:'relative', width:'100px', marginTop:10}}>Select All</Box>
          <Box style={{position:'relative', width:'100px', marginTop:10}}>Unselect All</Box>
        </Box>
      </Box>
    </Box>
  )
}
