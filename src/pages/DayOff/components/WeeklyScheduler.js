import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import {useState} from "react";


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
  alignItems: 'center',
  height:'0.5vw',
  fontSize: '1.2rem',
  borderColor: 'white',
  backgroundColor: (isSelected)? "rgba(224,181,72,0.2)" : "rgba(0,0,0,0)"
}));

const Task = styled('div')({
  backgroundColor: 'blue',
  color: 'white',
  borderRadius: '5px',
  padding: '5px',
  textAlign: 'center',
});

function h24toh12(hour) {
  if(hour === 0 || hour === 24) {
    return '12 am';
  } else if(hour === 12) {
    return '12 pm';
  } else if(hour < 12) {
    return `${hour} am`;
  } else {
    return `${hour - 12} pm`;
  }
}

export default function WeeklyScheduler() {
  const headers = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const hours = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
  const tenMinuteBlocks = Array.from({ length: 15 * 6 }, (_, i) => 8 * 60 + i * 10);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);


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

  const tasks = [
    {
      name: 'CSE101',
      day: 1, // 1 for Tuesday
      startTime: 8 * 60 + 10, // Start time in minutes from 0:00 (8:20 AM)
      endTime: 9 * 60 + 50, // End time in minutes from 0:00 (9:50 AM)
    },
    // ... more tasks
  ];

  const isTaskInHour = (task, dayIndex, hour) => {
    if (task.day !== dayIndex) return false;
    const taskStart = task.startHour + task.startMinute / 60;
    const taskEnd = task.endHour + task.endMinute / 60;
    return hour >= taskStart && hour < taskEnd;
  };


  return (
    <Box sx={{flex:1, marginLeft:'40px', marginRight:'40px'}} onMouseUp={handleMouseUp}>
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
                tenMinuteBlocks.map((block, blockIndex) => {
                  const isSelectedBlock = isSelected(dayIndex, blockIndex);
                  const isStartOfHour = block % 60 === 0;
                  const isEndOfHour = block % 60 === 50;
                  const cellStyle = {
                    borderTop: isStartOfHour? '0.5px solid white' : 'none',
                    borderBottom: isEndOfHour? '0.5px solid white' : 'none',
                    borderRight: '0.5px solid white',
                  };

                  return (
                    <Grid key={block}>
                      <MinuteCell
                        isSelected={isSelectedBlock}
                        onMouseDown={() => handleMouseDown(dayIndex, block)}
                        onMouseOver={() => handleMouseOver(dayIndex, block)}
                        style={cellStyle}
                      >
                        {/* Render tasks within each 10-minute block */}
                        {tasks.filter(task => task.day === dayIndex && block >= task.startTime && block < task.endTime).map((task, index) => (
                          <div key={index} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 123, 255, 0.5)' }}>
                            {block === task.startTime && task.name}
                          </div>
                        ))}
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

