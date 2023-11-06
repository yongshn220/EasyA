import {TextField} from "@mui/material";
import {whiteYellowInputFieldStyle} from "../util/util";
import React from "react";


export function YellowSearchBar({label, value, onChangeCallback, size}) {
  size = size?? '1.4rem'
  return (
    <TextField
      fullWidth
      id="outlined-multiline-flexible"
      label={label}
      maxRows={4}
      sx={{...whiteYellowInputFieldStyle }}
      inputProps={{
        style: { fontSize: size },
      }}
      value={value}
      onChange={onChangeCallback}
    />
  )
}
