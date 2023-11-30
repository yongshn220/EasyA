import {styled} from "@mui/material/styles";
import MainHeader from "./MainHeader";
import React from "react";
import {InsideWidthDesktop} from "../../../util/util";


export default function BaseLayout({children}) {
  return (
    <Base>
      <MainHeader/>
      <Body>
        <OutSide/>
        <Inside>
          {children}
        </Inside>
        <OutSide/>
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
  color:'black',
});

const Inside = styled('div')({
  display: 'flex',
  flex: `0 0 ${InsideWidthDesktop}`,
  '@media (max-width: 1200px)': {
    flex: '0 0 100%',
  },
});

const OutSide = styled('div')({
  flex: 1,
});


const Body = styled('div')({
  display: 'flex',
  flex: 1,
  backgroundColor:'#f3f3f3'
});
