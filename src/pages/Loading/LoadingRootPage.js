import {styled} from "@mui/material/styles";
import LoadingCircle from "./LoadingCircle";
import * as React from "react";


export default function LoadingRootPage() {
  return (
    <Base>
      <LoadingCircle/>
    </Base>
  )
}


const Base = styled('div')({
  width: '100vw',
  height: '100vh',
  color:'black',
  backgroundColor:'white',
});
