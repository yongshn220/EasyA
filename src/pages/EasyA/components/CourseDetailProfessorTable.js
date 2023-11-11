import * as React from 'react';
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
import {useState} from "react";
import {useRecoilValue} from "recoil";
import {professorSummaryByIdAtom} from "../../../0.Recoil/easyAState";

function Row({data}) {
  const [open, setOpen] = useState(false);
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
        <TableCell component="th" scope="row" sx={{color: 'white', fontSize: '1.2rem', border: 'unset' }}>{data.name}</TableCell>
        <TableCell align="right" sx={{color: 'white', fontSize: '1.2rem', border: 'unset'}}>{data?.average_eval?.Grade.A} %</TableCell>
        <TableCell align="right" sx={{color: 'white', fontSize: '1.2rem', border: 'unset'  }} >{data?.average_eval?.StudyingHours} hrs</TableCell>
      </TableRow>
      <TableRow sx={{backgroundColor: bgColor}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >Semester</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >A</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >A-</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >B+</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >B</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >B-</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >C+</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >C</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >Fail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.lectures.map((lecture, index) => (
                    <TableRow key={lecture.lecId + index} sx={{'&:hover': { backgroundColor: 'rgba(255,255,255,0.2)', cursor:'pointer'}}}>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}} component="th" scope="row">{lecture.course_year}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}}>{lecture.eval_data.Grade["A"] ?? "-"}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}}>{lecture.eval_data.Grade["A-"] ?? "-"}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}}>{lecture.eval_data.Grade["B+"] ?? "-"}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}}>{lecture.eval_data.Grade["B"] ?? "-"}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}}>{lecture.eval_data.Grade["B-"] ?? "-"}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}}>{lecture.eval_data.Grade["C+"] ?? "-"}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}}>{lecture.eval_data.Grade["C"] ?? "-"}</TableCell>
                        <TableCell sx={{color: 'white', fontSize: '1.2rem', marginBottom:'1rem'}}>{lecture.eval_data.Grade["fails"] ?? "-"}</TableCell>
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

export default function CourseDetailProfessorTable({profId}) {
  const professorSummary = useRecoilValue(professorSummaryByIdAtom(profId))

  return (
    <TableContainer component={Paper} sx={{backgroundColor: "rgba(0,0,0,0.0)"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
            <TableCell/>
            <TableCell sx={{display:'flex', alignItems:'center', color: COLOR.default, fontSize: '1.4rem'}}>Professor</TableCell>
            <TableCell align="right" sx={{color: COLOR.default, fontSize: '1.4rem'}}>avg Grade A (%)</TableCell>
            <TableCell align="right" sx={{color: COLOR.default, fontSize: '1.4rem'}}>avg Studying Hours (hrs)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professorSummary.professors.map((data) => (
            <Row key={data.id} data={data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
