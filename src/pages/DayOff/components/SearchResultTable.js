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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {COLOR} from "../../../util/util";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, cursor:'pointer' }} onClick={() => setOpen(!open)}>
        <TableCell sx={{ border: 'unset' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon sx={{color:'white'}}/> : <KeyboardArrowDownIcon sx={{color:'white'}}/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{color: 'white', fontSize: '1.2rem', border: 'unset' }} >{row.name}</TableCell>
        <TableCell align="right" sx={{color: 'white', fontSize: '1.2rem', border: 'unset'  }} >{row.calories}</TableCell>
        <TableCell align="right" sx={{color: 'white', fontSize: '1.2rem', border: 'unset'  }} >{row.fat}</TableCell>
        <TableCell align="right" sx={{color: 'white', fontSize: '1.2rem', border: 'unset'  }} >{row.carbs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >Lecture</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}} >Time</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}}  align="right">Building</TableCell>
                    <TableCell sx={{color: 'white', fontSize: '1.2rem'}}  align="right">Instructor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem'}} component="th" scope="row">{historyRow.date}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem'}}>{historyRow.customerId}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem'}} align="right">{historyRow.amount}</TableCell>
                      <TableCell sx={{color: 'white', fontSize: '1.2rem'}} align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function SearchResultTable() {
  return (
    <TableContainer component={Paper} sx={{backgroundColor: "rgba(0,0,0,0.25)"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{borderBottom: "1px solid", borderBottomColor: COLOR.yellow, backgroundColor:COLOR.yellow }}/>
            <TableCell sx={{color: COLOR.default, fontSize: '1.4rem', borderBottom: "1px solid", borderBottomColor: COLOR.yellow, backgroundColor:COLOR.yellow }}>Course</TableCell>
            <TableCell align="right" sx={{color: COLOR.default, fontSize: '1.4rem', borderBottom: "1px solid", borderBottomColor: COLOR.yellow, backgroundColor:COLOR.yellow }}>Title</TableCell>
            <TableCell align="right" sx={{color: COLOR.default, fontSize: '1.4rem', borderBottom: "1px solid", borderBottomColor: COLOR.yellow, backgroundColor:COLOR.yellow }}>Highest A Rank</TableCell>
            <TableCell align="right" sx={{color: COLOR.default, fontSize: '1.4rem', borderBottom: "1px solid", borderBottomColor: COLOR.yellow, backgroundColor:COLOR.yellow }}>Less Studing Hour Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
