import Grid from "@mui/material/Grid";
import BasicCard from "./BasicCard";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useEffect, useMemo, useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {
  HardwareType,
  maxCourseLoadNumAtom,
  selectedCourseDataAtom,
  userHardWareTypeAtom
} from "../0.Recoil/summaryState";
import {COLOR} from "../util/util";

const SortDirection = {
  "NORMAL": "sortDirectionNormal",
  "OPPOSITE": "sortDirectionOpposite",
}

export default function Rank({title, avgData, rankType}) {
  const setSelectedCourse = useSetRecoilState(selectedCourseDataAtom);
  const maxCourseLoadNum = useRecoilValue(maxCourseLoadNumAtom);
  const userHardwareType = useRecoilValue(userHardWareTypeAtom);
  const [itemsPerRow, setItemsPerRow] = useState(1);
  const [sortDirection, setSortDirection] = useState(SortDirection.NORMAL);

  const scoreTitle = (rankType === "Grade")? "A: " : "0-3h: "
  const dataKey = (rankType === "Grade")? "A" : "0-3"

  useEffect(() => {
    const handleResize = () => {
      if (userHardwareType === HardwareType.MOBILE) {
        setItemsPerRow(3)
        return
      }
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
  }, [userHardwareType]);

  const editedAvgData = useMemo(() => {
    return (sortDirection === SortDirection.NORMAL)? [...avgData] : [...avgData].reverse();
  }, [avgData, sortDirection])

  const slicedAvgData = useMemo(() => {
    return editedAvgData.slice(0, maxCourseLoadNum)
  }, [editedAvgData, maxCourseLoadNum])

  function handleOnCourseClick(e, courseData) {
    e.stopPropagation();
    setSelectedCourse(courseData)
  }

  return (
    <>
      <Box style={{display:'flex', justifyContent:'center', alignItems:'center', flex: "0 0 50px", fontSize:'2.0rem', fontWeight:'700'}}>
        <div>{title}</div>
        {
          (sortDirection === SortDirection.NORMAL)?
          <ArrowDownwardIcon sx={{marginLeft:'1rem', fontSize: "2.4rem", cursor: 'pointer', color: COLOR.yellow}}   onClick={() => setSortDirection(SortDirection.OPPOSITE)}/>
            :
          <ArrowUpwardIcon sx={{marginLeft:'1rem', fontSize: "2.4rem", cursor: 'pointer', color: COLOR.yellow}}   onClick={() => setSortDirection(SortDirection.NORMAL)}/>
        }
      </Box>
      <Box style={{flex: 1, padding:10, borderRadius:10, backgroundColor:'rgba(255, 255, 255, 0.2)'}}>
        <Grid container spacing={1}>
          {
            slicedAvgData.map((data, index) => (
              <Grid item xs={12 / itemsPerRow} key={index}>
                <div onClick={(e) => handleOnCourseClick(e, data)} style={{ cursor: 'pointer' }}>
                  <BasicCard
                    rank={index+1}
                    name={data.name}
                    score={scoreTitle + data[rankType][dataKey] + "%"}
                    sbc={data["SBC"]}
                  />
                </div>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </>
  )
}
