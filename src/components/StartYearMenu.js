import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useMemo, useState} from "react";
import {DefaultMaxCourseLoadNum, defaultYearAtom, maxCourseLoadNumAtom} from "../0.Recoil/summaryState";
import {useSetRecoilState} from "recoil";

export default function StartYearMenu() {
  const setDefaultYear = useSetRecoilState(defaultYearAtom);
  const setMaxCourseLoadNum = useSetRecoilState(maxCourseLoadNumAtom)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const YEARS = useMemo(() => {
    return [2014,2015,2016,2017,2018,2019,2020,2021,2022,2023]
  }, [])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeYear = (e, year) => {
    e.stopPropagation();
    setAnchorEl(null);
    setMaxCourseLoadNum(DefaultMaxCourseLoadNum);
    setDefaultYear(year)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{fontSize: "1.4rem"}}
      >
        Change Start Year
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          YEARS.map((year) => (
            <MenuItem key={year} sx={{fontSize: "1.4rem"}} onClick={(e) => handleChangeYear(e, year)}>{year}</MenuItem>
          ))
        }
      </Menu>
    </div>
  );
}
