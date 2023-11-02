import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useMemo, useState} from "react";
import {
  DefaultMaxCourseLoadNum, DefaultMaxCourseLoadNumMobile,
  defaultYearAtom, HardwareType as HardWareType,
  maxCourseLoadNumAtom,
  userHardWareTypeAtom
} from "../../../0.Recoil/easyAState";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {COLOR} from "../../../util/util";

export default function StartYearMenu() {
  const setDefaultYear = useSetRecoilState(defaultYearAtom);
  const setMaxCourseLoadNum = useSetRecoilState(maxCourseLoadNumAtom)
  const userHardWareType = useRecoilValue(userHardWareTypeAtom);
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
    const defaultLoadNum = (userHardWareType === HardWareType.MOBILE)? DefaultMaxCourseLoadNumMobile : DefaultMaxCourseLoadNum
    setMaxCourseLoadNum(defaultLoadNum);
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
        sx={{fontSize: "1.4rem", color:COLOR.yellow}}
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
