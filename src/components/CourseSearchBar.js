import {TextField} from "@mui/material";
import React, {useState} from "react";
import {COLOR} from "../util/util";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {currentFilteredDataAtom, selectedCourseDataAtom} from "../0.Recoil/summaryState";
import Button from "@mui/material/Button";
import PopupMessage from "./PopupMessage";


export default function CourseSearchBar() {
  const [inputText, setInputText] = useState("")
  const currentFilteredData = useRecoilValue(currentFilteredDataAtom)
  const setSelectedCourse = useSetRecoilState(selectedCourseDataAtom);
  const [openPopupMessage, setOpenPopupMessage] = React.useState(false);

  const customStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Set your desired border color
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
  };

  function handleTextFieldChange(e) {
    setInputText(e.target.value)
  }

  function handleEnterPress(e) {
    if (e.key === 'Enter') {
      handleSearchCourse(e)
    }
  }

  function handleSearchCourse(e) {
    e.stopPropagation();

    const eInputText = inputText.replace(/[a-zA-Z]/g, (match) => match.toUpperCase())

    const searchedData = currentFilteredData.find((data) => data.name === eInputText)
    if (searchedData) {
      setSelectedCourse(searchedData)
    }
    else {
      setOpenPopupMessage(true)
    }
  }

  return (
    <>
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        label="Search Course"
        maxRows={4}
        sx={{
          ...customStyles, // Apply custom border color
        }}
        inputProps={{ style: { fontSize: '1.4rem' } }}
        value={inputText}
        onChange={handleTextFieldChange}
        onKeyDown={handleEnterPress}
      />
      <Button onClick={handleSearchCourse} variant="contained"
        sx={{
          fontSize:'1.2rem',
          marginLeft:'1rem',
          backgroundColor: COLOR.yellow, // Change this to your desired background color
          '&:hover': {
            backgroundColor: COLOR.lightYellow, // Change this for the hover effect
          },
        }}
      >Search</Button>
      <PopupMessage  state={openPopupMessage} setState={setOpenPopupMessage}
                     message={"No match. Please change the filter or check the course ID."}
      />
    </>
  )
}
