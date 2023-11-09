import React from "react";
import {useRecoilState} from "recoil";
import {courseSearchInputAtom} from "../0.Recoil/easyAState";
import {YellowSearchBar} from "./YellowSearchBar";

export default function CourseSearchBar() {
  const [courseSearchInput, setCourseSearchInput] = useRecoilState(courseSearchInputAtom)

  function handleTextFieldChange(e) {
    setCourseSearchInput(e.target.value)
  }

  return (
    <YellowSearchBar label={"Search Course"} value={courseSearchInput} onChangeCallback={handleTextFieldChange}/>
  )
}
