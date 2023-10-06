import Grid from "@mui/material/Grid";
import BasicCard from "./BasicCard";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {useSetRecoilState} from "recoil";
import {selectedCourseDataAtom} from "../0.Recoil/summaryState";

export default function Rank({title, avgData, rankType}) {
  const setSelectedCourse = useSetRecoilState(selectedCourseDataAtom);
  const [itemsPerRow, setItemsPerRow] = useState(1);
  const scoreTitle = (rankType === "Grade")? "A: " : "0-3h: "
  const dataKey = (rankType === "Grade")? "A" : "0-3"

  useEffect(() => {
    const handleResize = () => {
      // Define the breakpoints and the number of items per row for each breakpoint
      const breakpoints = [
        { breakpoint: 700, items: 1 },
        { breakpoint: 1000, items: 2 },
        { breakpoint: 1200, items: 3 },
        { breakpoint: 1400, items: 4 },
        { breakpoint: 1920, items: 5 },
      ];

      // Determine the number of items per row based on the window width
      for (const breakpoint of breakpoints) {
        if (window.innerWidth < breakpoint.breakpoint) {
          console.log(window.innerWidth)
          setItemsPerRow(breakpoint.items);
          return;
        }
      }

      // Default to 5 items per row if none of the breakpoints match
      setItemsPerRow(5);
    };

    // Initial call to set the initial number of items per row
    handleResize();

    // Listen for the window resize event
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleOnCourseClick(courseData) {
    console.log(courseData.name)
    setSelectedCourse(courseData)
  }

  return (
    <>
      <Box style={{display:'flex', justifyContent:'center', alignItems:'center', flex: "0 0 50px", fontSize:'2.0rem', fontWeight:'700'}}>
        <div>{title}</div>
      </Box>
      <Box style={{flex: 1, marginLeft: 40, marginRight: 40, padding:10, borderRadius:10, backgroundColor:'#efefef'}}>
        <Grid container spacing={1}>
          {
            avgData.map((data, index) => (
              <Grid item xs={12 / itemsPerRow} key={index}>
                <div onClick={() => handleOnCourseClick(data)} style={{ cursor: 'pointer' }}>
                  <BasicCard rank={index+1} name={data.name} score={scoreTitle + data[rankType][dataKey] + "%"}/>
                </div>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </>
  )
}
