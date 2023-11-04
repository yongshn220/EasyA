import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {styled} from "@mui/material/styles";
import {COLOR} from "../../../util/util";
import {Divider} from "@mui/material";
import CourseItem from "./CourseItem";
import data from './2024SpringData.json'
import React, {useMemo, useState} from "react";
import Button from "@mui/material/Button";
import PopupMessage from "../../../components/PopupMessage";
import {useRecoilState} from "recoil";
import {addedCourseListAtom} from "./DayOffState";

const courses = Object.keys(data)

export default function FixedCoursesWrapper() {
  return (
    <Box style={{paddingTop:'40px'}}>
      <Box style={{marginLeft:"40px", marginBottom:'10px', fontSize:'2rem', fontWeight:'500', textAlign:'left'}}>
        Do you have mandatory courses? <span style={{fontWeight:'700', fontSize:'2.5rem', color:COLOR.yellow}}>Add here!</span>
      </Box>
      <FixedCourses/>
    </Box>
  )
}

function FixedCourses() {
  const [popupMessage, setPopupMessage] = useState({message:"", state:false, severity:"info"})
  const [selectedCRS, setSelectedCRS] = useState(null)
  const [selectedLEC, setSelectedLEC] = useState(null)
  const [selectedREC, setSelectedREC] = useState(null)
  const [selectedLAB, setSelectedLAB] = useState(null)
  const [addedCourses, setAddedCourses] = useRecoilState(addedCourseListAtom)

  const LECs = useMemo(() => {
    if (!selectedCRS) return null;
    const lecKeys = Object.keys(data[selectedCRS]["LEC"])
    return lecKeys.map((lecKey) => {
      const lec = data[selectedCRS]["LEC"][lecKey]
      return {
        label: `${lecKey}  (${lec["day"]} | ${lec["time"]})`,
        key: lecKey
      }
    })
  }, [selectedCRS])

  const RECs = useMemo(() => {
    if (!selectedCRS || !selectedLEC) return null;
    const recKeys = Object.keys(data[selectedCRS]["LEC"][selectedLEC]["REC"])
    return recKeys.map((recKey) => {
      const rec = data[selectedCRS]["LEC"][selectedLEC]["REC"][recKey]
      return {
        label: `${recKey}  (${rec["day"]} | ${rec["time"]})`,
        key: recKey
      }
    })
  }, [selectedCRS, selectedLEC])

  const LABs = useMemo(() => {
    if (!selectedCRS || !selectedLEC) return null;
    const labKeys = Object.keys(data[selectedCRS]["LEC"][selectedLEC]["LAB"])
    return labKeys.map((labKey) => {
      const rec = data[selectedCRS]["LEC"][selectedLEC]["LAB"][labKey]
      return {
        label: `${labKey}  (${rec["day"]} | ${rec["time"]})`,
        key: labKey
      }
    })
  }, [selectedCRS, selectedLEC])

  function handleSelectCRS(value) {
    setSelectedCRS(value);
    setSelectedLEC(null)
    setSelectedREC(null)
    setSelectedLAB(null)
  }

  function handleSelectLEC(value) {
    if (!value || value === "") {
      setSelectedLEC(null)
    }
    else {
      setSelectedLEC(value.key)
    }
    setSelectedREC(null)
    setSelectedLAB(null)
  }

  function handleSelectREC(value) {
    if (!value || value.key === "") {
      setSelectedREC(null)
    }
    else {
      setSelectedREC(value.key)
    }
  }

  function handleSelectLAB(value) {
    if (!value || value.key === "") {
      setSelectedLAB(null)
    }
    else {
      setSelectedLAB(value.key)
    }
  }

  function handleAddCourse() {
    if (!selectedCRS) {
      setPopupMessage({message: "You need to select the Subject.", state:true, severity: "warning"})
      return;
    }
    if (!selectedLEC) {
      setPopupMessage({message: "You need to select the Lecture.", state:true, severity: "warning"})
      return;
    }

    const crsId = `${data[selectedCRS]["id"]}-${data[selectedCRS]["number"]}`
    let addingList = []
    const slec = data[selectedCRS]["LEC"][selectedLEC]
    slec["title"] = data[selectedCRS]["title"]
    slec["id"] = `${crsId} ${slec["id"]}`
    addingList.push(slec)
    if (selectedREC){
      slec["REC"][selectedREC]["id"] = `${crsId} ${slec["REC"][selectedREC]["id"]}`
      slec["REC"][selectedREC]["title"] = "Recitation"
      addingList.push(slec["REC"][selectedREC])
    }
    if (selectedLAB) {
      slec["LAB"][selectedLAB]["id"] = `${crsId} ${slec["LAB"][selectedLAB]["id"]}`
      slec["LAB"][selectedLAB]["title"] = "Laboratory"
      addingList.push(slec["LAB"][selectedLAB])
    }

    setAddedCourses([...addedCourses, ...addingList])
  }

  return(
    <BaseBox>
      <PopupMessage severity={popupMessage.severity} state={popupMessage.state} setState={(state) => setPopupMessage({...popupMessage, state: state})} message={popupMessage.message}/>
      <Box style={{display:'flex', flex:1, flexDirection:'column', marginTop:'20px', marginRight:'20px'}}>
        <Box style={{display:'flex', marginBottom:'10px'}}>
          <Box style={{margin:'20px', minWidth:'6rem'}}>Subject</Box>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={courses}
            sx={{width:'100%', ...customStyles}}
            value={selectedCRS}
            onChange={(e, value) => handleSelectCRS(value)}
            renderInput={(params) => <TextField {...params} label="Select Subject..." />}
          />
        </Box>
        {
          (LECs?.length > 0) &&
          <Box style={{display:'flex', marginBottom:'10px'}}>
            <Box style={{margin:'20px', minWidth:'6rem'}}>Lecture</Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={LECs}
              value={selectedLEC}
              onChange={(e, value) => handleSelectLEC(value)}
              sx={{width:'100%', ...customStyles}}
              renderInput={(params) => <TextField {...params} label="Select Course..." />}
            />
          </Box>
        }
        {
          (RECs?.length > 0) &&
          <Box style={{display:'flex', marginBottom:'10px'}}>
            <Box style={{margin:'20px', minWidth:'6rem'}}>Recitation</Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={RECs}
              value={selectedREC}
              onChange={(e, value) => handleSelectREC(value)}
              sx={{width:'100%', ...customStyles}}
              renderInput={(params) => <TextField {...params} label="Select Recitation..." />}
            />
          </Box>
        }
        {
          (LABs?.length > 0) &&
          <Box style={{display:'flex', marginBottom:'10px'}}>
            <Box style={{margin:'20px', minWidth:'6rem'}}>Laboratory</Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={LABs}
              value={selectedLAB}
              onChange={(e, value) => handleSelectLAB(value)}
              sx={{width:'100%', ...customStyles}}
              renderInput={(params) => <TextField {...params} label="Select Laboratory..." />}
            />
          </Box>
        }
        <Box style={{display:'flex', marginBottom:'10px', justifyContent:'right'}}>
          <Button  variant="contained"
            sx={{
              flex: 0.35,
              fontSize:'1.2rem',
              marginLeft:'1rem',
              backgroundColor: COLOR.yellow, // Change this to your desired background color
              '&:hover': {
                backgroundColor: COLOR.lightYellow, // Change this for the hover effect
              },
            }}
            onClick={() => handleAddCourse()}
          >Add</Button>
        </Box>
      </Box>
      <Divider style={{flex:'0 0 1px', backgroundColor:"#8d8d8d"}}/>
      <Box style={{flex:1, marginTop:'20px', marginLeft:'20px'}}>
        <Box sx={{
          height: '100%', // or any desired height
          overflowY: 'auto', // For vertical scrolling
          '&::-webkit-scrollbar': {
            width: 0,
            background: 'transparent', // Make the scrollbar transparent
          }
        }}>
          {
            addedCourses.map(course => (
                <CourseItem id={course["id"]} title={course["title"]} building={course["building"]} daytime={`${course["day"]} ${course["time"]}`}/>
            ))
          }
        </Box>
      </Box>
    </BaseBox>
  )
}


const BaseBox = styled('div')({
  display:'flex',
  flex:'1',
  height:'30vh',
  marginLeft:'40px',
  marginRight:'40px',
  padding:'20px',
  borderRadius:'5px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
})


const customStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Set your desired border color
    },
    '&:hover fieldset': {
      borderColor: COLOR.lightYellow,
    },
    '&.Mui-focused fieldset': {
      borderColor: COLOR.yellow, // Change this to your desired color
    },
  },
  '& .MuiFormLabel-root': {
    color: 'white', // Set the label font color
  },
  '& .MuiInputBase-input': {
    color: 'white', // Set your desired font color
  },
  '& label.Mui-focused': {
    color: 'white', // Change this to your desired label color
  },
  '& .MuiAutocomplete-clearIndicator': {
    color: 'white', // Change this to your desired color for the 'x' clear icon
  },
  '& .MuiAutocomplete-popupIndicator': {
    color: 'white', // Change this to your desired color for the dropdown arrow icon
  },
  '& .MuiAutocomplete-clearIndicator:hover, & .MuiAutocomplete-popupIndicator:hover': {
    color: COLOR.lightYellow, // Change hover color for the icons
  }
};
