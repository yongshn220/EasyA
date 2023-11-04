import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

const HeaderCell = styled('div')({
  backgroundColor: 'gray',
  borderColor: 'white',
  border: '0.5px solid',
  height:'2rem',
  fontSize: '1.2rem',
});

const CellDiv = styled('div')({
  display:'flex',
  alignItems: 'center',
  height:'3vw',
  fontSize: '1.2rem',
  borderColor: 'white',
  border: '0.5px solid',
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

  return (
    <Box sx={{flex:1, margin:'40px'}}>
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
          Array.from(Array(5)).map((_, index) => (
            <Grid key={index} container alignItems="stretch" direction="column" xs={2.2}>
              {
                hours.map(hour => (
                  <Grid key={hour}>
                    <CellDiv>
                      <div style={{flex:1}}></div>
                    </CellDiv>
                  </Grid>
                ))
              }
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}

