import React from "react";
import {styled} from "@mui/material/styles";


export default function HomeWrapperWhite({children}) {
  return (
    <Content>
      {children}
    </Content>
  )
}


const Content = styled('div')({
  position:'relative',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems:'center',
  width: '100vw',
  Height: '100vh',
  color:'black',
  backgroundColor:'white',
});

