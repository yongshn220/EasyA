import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {getMajorList, getSummary} from "../api/api";


/* -------------------------
*     CONST VARIABLES
---------------------------*/

export const HardwareType = {
  PC: 'hardwareTypePC',
  MOBILE: 'hardwareTypeMobile',
}
export const SBCs = ["ARTS", "GLO", "HUM", "QPS", "SBS", "SNW", "TECH", "USA", "STAS", "EXP+", "SBS+", "STEM+", "CER", "DIV", "ESI", "SPK", "WRTD", "None"]
export const Levels = [100,200,300,400]
export const DefaultFilteredLevels = [300, 400]
export const CourseSizes = [0, 20, 50, 100, 200, 300]
export const DefaultCourseSize = 100
export const DefaultMaxCourseLoadNum = 100
export const NextLoadNumPerStep = 50



/* -------------------------
*        USER DEVICE
---------------------------*/
export const userHardWareTypeAtom = atom({
  key: 'userHardWareTypeAtom',
  default: HardwareType.PC,
})


/* -------------------------
*  NUM OF LOADING COURSES
---------------------------*/
export const maxCourseLoadNumAtom = atom({
  key: 'maxCourseLoadNumAtom',
  default: DefaultMaxCourseLoadNum
})

export const validCourseNumAtom = atom({
  key: 'validCourseNumAtom',
  default: 0
})


/* -------------------------
*           YEAR
---------------------------*/
export const defaultYearAtom = atom({
  key: 'defaultYearAtom',
  default: 2020,
})

export const summaryByStartYearAtom = atomFamily({
  key: 'summaryByStartYearAtomAtom',
  default: selectorFamily({
    key: 'summaryByStartYearAtomAtom/Default',
    get: (year) => async () => {
      return await getSummary(year);
    }
  })
})

/* -------------------------
*          FILTER
---------------------------*/
export const majorListAtom = atom({
  key: 'majorListAtom',
  default: selector({
    key: 'majorListAtom/Default',
    get: async () => {
      let majors = await getMajorList();
      majors = majors.sort();
      return majors;
    }
  })
})


export const filteredMajorsAtom = atom({
  key: 'filteredMajorsAtom',
  default: []
})

export const filteredSBCsAtom = atom({
  key: 'filteredSBCsAtom',
  default: []
})

export const filteredLevelsAtom = atom({
  key: 'filteredLevelsAtom',
  default: DefaultFilteredLevels
})

export const selectedCourseSizeAtom = atom({
  key: 'selectedCourseSizeAtom',
  default: DefaultCourseSize
})


/* -------------------------
*     COURSE DETAIL VIEW
---------------------------*/
export const selectedCourseDataAtom = atom({
  key: "selectedCourseDataAtom",
  default: null
})

export const gradeRankAtom = atom({
  key: "gradeRankAtom",
  default: {}
})

export const studyingHoursRankAtom = atom({
  key: "studyingHoursRankAtom",
  default: {}
})


