import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import {useRecoilState, useRecoilValue} from "recoil";
import {
  filteredLevelsAtom,
  filteredMajorsAtom,
  filteredSBCsAtom,
  Levels,
  majorListAtom,
  SBCs, CourseSizes, selectedCourseSizeAtom
} from "../0.Recoil/summaryState";
import {useEffect} from "react";
import Button from "@mui/material/Button";


export default function CourseFilter() {
  const majorList = useRecoilValue(majorListAtom);
  const [filteredMajors, setFilteredMajors] = useRecoilState(filteredMajorsAtom);
  const [filteredSBCs, setFilteredSBCs] = useRecoilState(filteredSBCsAtom);
  const [filteredLevels, setFilteredLevels] = useRecoilState(filteredLevelsAtom);
  const [selectedCourseSize, setSelectedCourseSize] = useRecoilState(selectedCourseSizeAtom)

  useEffect(() => {
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

  function handleClickSBC(e, sbc) {
    e.stopPropagation();

    if (filteredSBCs.includes(sbc)) {
      setFilteredSBCs(filteredSBCs.filter((_sbc) => _sbc !== sbc));
    }
    else {
      setFilteredSBCs([...filteredSBCs, sbc])
    }
  }

  function handleClickLevel(e, sbc) {
    e.stopPropagation();

    if (filteredLevels.includes(sbc)) {
      setFilteredLevels(filteredLevels.filter((_sbc) => _sbc !== sbc));
    }
    else {
      setFilteredLevels([...filteredLevels, sbc])
    }
  }

  function handleClickCourseSize(e, size) {
    e.stopPropagation();
    setSelectedCourseSize(size);
  }

  function handleClickSelectAllMajors(e) {
    e.stopPropagation()
    setFilteredMajors([])
  }

  function handleClickUnselectAllMajors(e) {
    e.stopPropagation()
    setFilteredMajors(majorList)
  }

  function handleClickSelectAllSBCs(e) {
    e.stopPropagation()
    setFilteredSBCs([])
  }

  function handleClickUnselectAllSBCs(e) {
    e.stopPropagation()
    setFilteredSBCs(SBCs)
  }

  function handleClickSelectAllLevels(e) {
    e.stopPropagation()
    setFilteredLevels([])
  }

  function handleClickUnselectAllLevels(e) {
    e.stopPropagation()
    setFilteredLevels(Levels)
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
            <Button onClick={(e) => handleClickSelectAllMajors(e)} style={{position:'relative', width:'100px', marginTop:10}}>Select All</Button>
            <Button onClick={(e) => handleClickUnselectAllMajors(e)} style={{position:'relative', width:'100px', marginTop:10}}>Unselect All</Button>
          </Box>
        </Box>
      </Box>
      <Box style={{display:'flex', flexDirection:'column', flex:1}}>
        <Box style={{flex:0, fontSize:'1.6rem', fontWeight:'600', color:'gray'}}>
          SBCs
        </Box>
        <Box style={{flex:1, padding:'10px'}}>
          {
            SBCs.map((sbc) => {
              const variant = (filteredSBCs.includes(sbc))? "outlined" : "";
              return <Chip key={sbc} onClick={(e) => handleClickSBC(e, sbc)} color="success" label={sbc} sx={{fontSize:'1.2rem', margin:'3px'}} variant={variant} />
            })
          }
          <Box style={{display:'flex', flex:1, flexDirection:'row', justifyContent:'center'}}>
            <Button onClick={(e) => handleClickSelectAllSBCs(e)} style={{position:'relative', width:'100px', marginTop:10}}>Select All</Button>
            <Button onClick={(e) => handleClickUnselectAllSBCs(e)} style={{position:'relative', width:'100px', marginTop:10}}>Unselect All</Button>
          </Box>
        </Box>
      </Box>
      <Box style={{display:'flex', flexDirection:'column', flex:1}}>
        <Box style={{flex:0, fontSize:'1.6rem', fontWeight:'600', color:'gray'}}>
          Course Level
        </Box>
        <Box style={{flex:1, padding:'10px'}}>
          {
            Levels.map((level) => {
              const variant = (filteredLevels.includes(level))? "outlined" : "";
              return <Chip key={level} onClick={(e) => handleClickLevel(e, level)} color="warning" label={level+"+"} sx={{fontSize:'1.2rem', margin:'3px'}} variant={variant} />
            })
          }
          <Box style={{display:'flex', flex:1, flexDirection:'row', justifyContent:'center'}}>
            <Button onClick={(e) => handleClickSelectAllLevels(e)} style={{position:'relative', width:'100px', marginTop:10}}>Select All</Button>
            <Button onClick={(e) => handleClickUnselectAllLevels(e)} style={{position:'relative', width:'100px', marginTop:10}}>Unselect All</Button>
          </Box>
        </Box>
      </Box>
      <Box style={{display:'flex', flexDirection:'column', flex:1}}>
        <Box style={{flex:0, fontSize:'1.6rem', fontWeight:'600', color:'gray'}}>
          Course Size (# of Students)
        </Box>
        <Box style={{flex:1, padding:'10px'}}>
          {
            CourseSizes.map((courseSize) => {
              const variant = (selectedCourseSize === courseSize)? "outlined" : "";
              return <Chip key={courseSize} onClick={(e) => handleClickCourseSize(e, courseSize)} color="error" label={courseSize+"+"} sx={{fontSize:'1.2rem', margin:'3px'}} variant={variant} />
            })
          }
        </Box>
      </Box>
    </Box>
  )
}
