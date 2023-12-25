import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import {ContentType} from "./ProfileHome";


export default function ContentTypeMenu({contentType, setContentType}) {

  function handleButtonClick(type) {
    setContentType(type)
  }

  return (
    <Box
      sx={{
        display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup disableElevation size="large" variant="outlined" aria-label="outlined button group">
        <Button onClick={() => handleButtonClick(ContentType.MY)} variant={contentType===ContentType.MY? "contained" : "outlined"} sx={{fontSize:'1.2rem'}}>My</Button>
        <Button onClick={() => handleButtonClick(ContentType.LIKED)} variant={contentType===ContentType.LIKED? "contained" : "outlined"} sx={{fontSize:'1.2rem'}}>Liked</Button>
      </ButtonGroup>
    </Box>
  )
}
