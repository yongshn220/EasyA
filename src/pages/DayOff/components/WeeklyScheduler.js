import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import {courseToTask, h24toh12} from "./TimeCalculationHelper";
import {addedCourseListAtom} from "./DayOffState";
import {useRecoilValue} from "recoil";

const HeaderCell = styled('div')({
  backgroundColor: 'gray',
  borderColor: 'white',
  border: '0.5px solid',
  height:'2rem',
  fontSize: '1.2rem',
});

const CellDiv = styled('div')(({isSelected}) => ({
  display:'flex',
  alignItems: 'center',
  height:'3vw',
  fontSize: '1.2rem',
  border: '0.5px solid white',
  backgroundColor: (isSelected)? "rgba(224,181,72,0.2)" : "rgba(0,0,0,0)"
}));

const MinuteCell = styled('div')(({isSelected}) => ({
  display:'flex',
  height:'0.5vw',
  fontSize: '1.2rem',
  borderColor: 'white',
  backgroundColor: (isSelected)? "rgba(224,181,72,0.2)" : "rgba(0,0,0,0)"
}));

const TaskDiv = styled('div')({
  backgroundColor: '#4169e1', // Example color, you can change this
  color: 'white',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px', // Optional, for rounded corners
  fontSize: '1rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Optional, for a slight shadow effect
  pointerEvents: 'auto', // This allows the task to be clickable, if needed
});

export default function WeeklyScheduler() {
  const headers = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const hours = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
  const tenMinuteBlocks = Array.from({ length: 15 * 6 }, (_, i) => 8 * 60 + i * 10);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const addedCourseList = useRecoilValue(addedCourseListAtom)

  const toggleCellSelection = (day, hour) => {
    const cellKey = `${day}-${hour}`;
    setSelectedCells(prev => {
      const newSelectedCells = new Set([...prev]);
      if (newSelectedCells.has(cellKey)) {
        newSelectedCells.delete(cellKey);
      }
      else {
        newSelectedCells.add(cellKey);
      }
      return newSelectedCells;
    });
  };

  const handleMouseDown = (day, hour) => {
    setIsSelecting(true);
    toggleCellSelection(day, hour);
  };

  const handleMouseOver = (day, hour) => {
    if (isSelecting) {
      toggleCellSelection(day, hour);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const isSelected = (day, hour) => selectedCells.has(`${day}-${hour}`);

  // Example task
  const tasks = [
    {
      name: 'CSE101',
      dayIndex: 1, // Tuesday
      startTime: 8*60+20,
      mLength: 90,
      startHour: 8, // 8 AM
      startMinute: 20,
      endHour: 9, // 9 AM
      endMinute: 50
    },
  ]

  return (
    <Box sx={{flex: 1, marginLeft: '40px', marginRight: '40px' }} onMouseUp={handleMouseUp}>
      <Grid container>
        <Grid xs={1}>
          <HeaderCell>Time</HeaderCell>
        </Grid>
        {
          headers.map((header, index) => (
            <Grid xs={2.2} key={index}>
              <HeaderCell>{header}</HeaderCell>
            </Grid>
          ))
        }
      </Grid>
      <Grid container>
        <Grid container alignItems="stretch" direction="column" xs={1}>
          {
            hours.map(hour => (
              <Grid key={hour}>
                <CellDiv>
                  <div style={{flex:1}}>{h24toh12(hour)}</div>
                </CellDiv>
              </Grid>
            ))
          }
        </Grid>
        {
          Array.from(Array(5)).map((_, dayIndex) => (
            <Grid key={dayIndex} container alignItems="stretch" direction="column" xs={2.2}>
              {
                tenMinuteBlocks.map((timeBlock, blockIndex) => {
                  const isSelectedBlock = isSelected(dayIndex, blockIndex);
                  const isStartOfHour = timeBlock % 60 === 0;
                  const isEndOfHour = timeBlock % 60 === 50;
                  const cellStyle = {
                    borderTop: isStartOfHour? '0.5px solid white' : 'none',
                    borderBottom: isEndOfHour? '0.5px solid white' : 'none',
                    borderRight: '0.5px solid white',
                  };

                  return (
                    <Grid key={timeBlock}>
                      <MinuteCell
                        isSelected={isSelectedBlock}
                        onMouseDown={() => handleMouseDown(dayIndex, timeBlock)}
                        onMouseOver={() => handleMouseOver(dayIndex, timeBlock)}
                        style={cellStyle}
                      >
                        {
                          addedCourseList.map(course => {
                            const tasks = courseToTask(course)
                            return tasks.map((task) => {
                              if (task.startTime === timeBlock && task.dayIndex === dayIndex) {
                                return (
                                  <TaskDiv style={{height: `${0.5 * (task.mLength/10)}vw`, zIndex:100}}>
                                    {`${task.id} ${task.instructor}`} <br/> {task.time}
                                  </TaskDiv>
                                )
                              }
                              else {
                                return <></>
                              }
                            })
                          })
                        }
                      </MinuteCell>
                    </Grid>
                  );
                })
              }
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}
