import {styled} from "@mui/material/styles";
import MainHeader from "./MainHeader";
import React from "react";


export default function BaseLayout({children}) {
  return (
    <Base>
      <MainHeader/>
      <Body>
        {children}
      </Body>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection:'column',
  position: 'absolute',
  width: '100vw',
  minHeight: '100vh',
  backgroundColor: 'white',
  color:'black',
});

const Body = styled('div')({
  display: 'flex',
  flex: 1,
  backgroundColor:'#E1E1E1'
});
