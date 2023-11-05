import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import {courseToTask, daytimeIndexToKey, h24toh12} from "./TimeCalculationHelper";
import {addedCourseListAtom, selectedTimeSetAtom} from "./DayOffState";
import {useRecoilState, useRecoilValue} from "recoil";

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

const DragMode = {
  SELECT: "dragModeSelect",
  REMOVE: "dragModeRemove",
}
export default function WeeklyScheduler() {
  const headers = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const hours = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
  const tenMinuteBlocks = Array.from({ length: 15 * 6 }, (_, i) => 8 * 60 + i * 10);
  const [selectedCells, setSelectedCells] = useRecoilState(selectedTimeSetAtom);
  const [isSelecting, setIsSelecting] = useState(false);
  const [dragMode, setDragMode] = useState(DragMode.SELECT)
  const addedCourseList = useRecoilValue(addedCourseListAtom)

  const toggleCellSelection = (dragMode, dayIndex, blockIndex) => {
    let cellKeys = []
    let startIndex = blockIndex - (blockIndex % 6)
    let endIndex = blockIndex + (6 - (blockIndex % 6))
    for (startIndex; startIndex < endIndex; startIndex++) {
      cellKeys.push(`${dayIndex}-${480 + startIndex*10}`);
    }

    const newSelectedCells = new Set([...selectedCells])
    for (let cellKey of cellKeys) {
      if (dragMode === DragMode.SELECT) {
        newSelectedCells.add(cellKey);
      }
      else {
        newSelectedCells.delete(cellKey);
      }
    }
    setSelectedCells(newSelectedCells)
  };

  const handleMouseDown = (isSelectedBlock, dayIndex, blockIndex) => {
    setIsSelecting(true);
    const _dragMode = isSelectedBlock? DragMode.REMOVE: DragMode.SELECT
    setDragMode(_dragMode) // DragMode State is used on MouseOver callback.
    toggleCellSelection(_dragMode, dayIndex, blockIndex);
  };

  const handleMouseOver = (dayIndex, blockIndex) => {
    if (isSelecting) {
      toggleCellSelection(dragMode, dayIndex, blockIndex);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  function isSelected(dayIndex, timeBlock) {
    return selectedCells.has(daytimeIndexToKey(dayIndex, timeBlock))
  }

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
                  const isSelectedBlock = isSelected(dayIndex, timeBlock);
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
                        onMouseDown={() => handleMouseDown(isSelectedBlock, dayIndex, blockIndex)}
                        onMouseOver={() => handleMouseOver(dayIndex, blockIndex)}
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
