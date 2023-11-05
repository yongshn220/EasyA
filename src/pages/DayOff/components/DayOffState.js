import {atom} from "recoil";


export const addedCourseListAtom = atom({
  key: 'addedCourseListAtom',
  default: []
})

export const selectedTimeSetAtom = atom({
  key: "selectedTimeSetAtom",
  default: new Set()
})
