import {TextField} from "@mui/material";
import React from "react";
import {COLOR} from "../util/util";
import {useRecoilState} from "recoil";
import {courseSearchInputAtom} from "../0.Recoil/easyAState";

export default function CourseSearchBar() {
  const [courseSearchInput, setCourseSearchInput] = useRecoilState(courseSearchInputAtom)

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
    setCourseSearchInput(e.target.value)
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
        value={courseSearchInput}
        onChange={handleTextFieldChange}
      />
    </>
  )
}
