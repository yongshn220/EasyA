import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {COLOR} from "../../../util/util";
import {TableFooter} from "@mui/material";
import Button from "@mui/material/Button";

function Row({course}) {
  const [open, setOpen] = React.useState(false);


  const bgColor = (open)? "rgba(0,0,0,0.2)" : "tranparent"

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, cursor:'pointer', backgroundColor: bgColor}} onClick={() => setOpen(!open)}>
        <TableCell sx={{ border: 'unset' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon sx={{color:'white'}}/> : <KeyboardArrowDownIcon sx={{color:'white'}}/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{color: 'white', fontSize: '1.2rem', border: 'unset' }}>{course.id}</TableCell>
        <TableCell align="right" sx={{color: 'white', fontSize: '1.2rem', border: 'unset'  }} >{course.title}</TableCell>
        <TableCell align="right" sx={{color: 'white', fontSize: '1.2rem', border: 'unset'  }} >{course.averageGradeA}</TableCell>
        <TableCell align="right" sx={{color: 'white', fontSize: '1.2rem', border: 'unset'  }} >{course.averageStudyingHours}</TableCell>
      </TableRow>
      <TableRow sx={{backgroundColor: bgColor}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >Lecture</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >Day Time</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}}  align="right">Instructor</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}}  align="right">Building</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}}  align="right">REC / LAB</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}}  align="right">Day Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {course.lectureCombinations.map((lecComb, index) => (
                    <TableRow key={lecComb.lecId + index} sx={{'&:hover': { backgroundColor: 'rgba(255,255,255,0.2)', cursor:'pointer'}}}>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} component="th" scope="row">{lecComb.lecId}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}}>{lecComb.lecDay + " " + lecComb.lecTime}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} align="right">{lecComb.lecInstructor}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} align="right">{lecComb.lecBuilding}</TableCell>
                      { lecComb.combinationType === "REC" && <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} align="right">{"REC" + " " + lecComb.recId}</TableCell> }
                      { lecComb.combinationType === "REC" && <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} align="right">{lecComb.recDay + " " + lecComb.recTime}</TableCell> }
                      { lecComb.combinationType === "LAB" && <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} align="right">{"LAB" + " " + lecComb.labId}</TableCell> }
                      { lecComb.combinationType === "LAB" && <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} align="right">{lecComb.labDay + " " + lecComb.labTime}</TableCell> }
                      { lecComb.combinationType === "NONE" && <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} align="right">x</TableCell> }
                      { lecComb.combinationType === "NONE" && <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} align="right">x</TableCell> }
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function SearchResultTable({data}) {
  const [rowsToShow, setRowsToShow] = React.useState(10);

  const handleLoadMore = () => {
    setRowsToShow(prev => prev + 10);
  };

  return (
    <TableContainer component={Paper} sx={{backgroundColor: "rgba(0,0,0,0.25)"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
            <TableCell/>
            <TableCell sx={{color: COLOR.default, fontSize: '1.4rem'}}>Course</TableCell>
            <TableCell align="right" sx={{color: COLOR.default, fontSize: '1.4rem'}}>Title</TableCell>
            <TableCell align="right" sx={{color: COLOR.default, fontSize: '1.4rem'}}>Average Grade A</TableCell>
            <TableCell align="right" sx={{color: COLOR.default, fontSize: '1.4rem'}}>Average Studying Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(0, rowsToShow).map((course) => (
            <Row key={course.id} course={course} />
          ))}
        </TableBody>
      </Table>
      {
        rowsToShow < data.length && (
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <Button onClick={handleLoadMore} variant="text" sx={{fontSize:'1.2rem', flex: '0 0 10rem', marginBottom:'1rem', color:COLOR.yellow}}>LOAD MORE</Button>
          </div>
        )
      }
    </TableContainer>
  );
}
