import SearchIcon from "@mui/icons-material/Search";
import {COLOR} from "../../../util/util";
import * as React from "react";
import {InputAdornment, TextField} from "@mui/material";

export const inputFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: COLOR.yellow, // Set your desired border color
    },
    '&.Mui-focused fieldset': {
      borderColor: COLOR.yellow, // Change this to your desired color
    },
    '&:hover fieldset': {
      borderColor: COLOR.lightYellow, // Set border color on hover
    },
    'input': {
      padding: '10px', // Adjust this value as needed
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

export default function CourseSearchInputField({label, value, onChangeCallback}) {
  return (
    <TextField
      id="input-with-icon-textfield"
      label={label}
      sx={inputFieldStyle}
      InputProps={{
        style: {fontSize: '1.2rem'},
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{fontSize:'2rem', marginRight:'0.5rem', color:COLOR.yellow, cursor:'pointer'}}/>
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={onChangeCallback}
    />
  )
}
