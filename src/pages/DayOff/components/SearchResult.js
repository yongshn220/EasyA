import {styled} from "@mui/material/styles";
import SearchResultTable from "./SearchResultTable"
import React from "react";


export default function SearchResult() {

  return (
    <BaseBox>
      <CourseItem>
        <SearchResultTable/>
      </CourseItem>
    </BaseBox>
  )
}


const BaseBox = styled('div')({
  display:'flex',
  position:'fixed',
  bottom:0,
  height:'30vh',
  width:'100vw',
  borderRadius:'10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
  backgroundImage: `url('/graybg.jpeg')`,
  zIndex:100,
})


const CourseItem = styled('div')({
  flex:1,
  margin:'1rem',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
  width: 0,
    background: 'transparent',
  }
})
