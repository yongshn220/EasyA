import {atom} from "recoil";


export const addedCourseListAtom = atom({
  key: 'addedCourseListAtom',
  default: []
})

export const selectedTimeSetAtom = atom({
  key: "selectedTimeSetAtom",
  default: new Set()
})

export const hoveredLectureHeaderAtom = atom({
  key: "hoveredLectureHeaderAtom",
  default: null
})

export const dayOffPopupMessageAtom = atom({
  key: 'dayOffPopupMessageAtom',
  default: {message:"", state:false, severity:"info"}
})
