import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {getCourseInfo, getSummary} from "../api/api";


/* -------------------------
*     CONST VARIABLES
---------------------------*/

export const HardwareType = {
  PC: 'hardwareTypePC',
  MOBILE: 'hardwareTypeMobile',
}
export const SBCs = ['ARTS', 'CER', 'DIV', 'ESI', 'EXP+', 'GLO', 'HFA+', 'HUM', 'LANG', 'QPS', 'SBS', 'SBS+', 'SNW', 'SPK', 'STEM+', 'STAS', 'TECH', 'USA', 'WRT', 'WRTD', 'None']
export const Majors = ["AAS","ACC","ADV","AFH","AFS","AIM","AMR","AMS","ANP","ANT","ARB","ARH","ARS","ASC","AST","ATM","BCP","BIO","BME","BUS","CAR","CCS","CDS","CEF","CHE","CHI","CIV","CLL","CLS","CLT","CME","COM","CSE","CWL","DAN","DIA","EAS","EBH","ECO","EDP","EEL","EEO","EGL","ENS","ENV","ESE","ESG","ESM","EST","EUR","EXT","FLA","FLM","FRN","GEO","GER","GLI","GRK","GSS","HAD","HAL","HAN","HAT","HBA","HBH","HBM","HBP","HBW","HBY","HDG","HDO","HDP","HIN","HIS","HNI","HON","HUE","HUF","HUG","HUI","HUL","HUR","HUS","HWC","IAE","IAP","INT","ISE","ITL","JDH","JDS","JPN","JRN","KOR","KSW","LAC","LAN","LAT","LCR","LDR","LHD","LHW","LIA","LIN","MAE","MAP","MAR","MAT","MDA","MEC","MSL","MUS","MVL","OAE","PER","PHI","PHY","POL","POR","PSY","RLS","RUS","SBU","SCH","SCI","SKT","SLN","SOC","SPN","SSE","SUS","THR","TRK","TVW","UKR","VIP","WAE","WRT","WSE","WST"]
export const Levels = [100,200,300,400]
export const DefaultFilteredLevels = [300, 400]
export const CourseSizes = [0, 20, 50, 100, 200, 300]
export const DefaultCourseSize = 100
export const DefaultMaxCourseLoadNum = 100
export const DefaultMaxCourseLoadNumMobile = 20
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
*           API
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

export const courseInfoAtom = atom({
  key: 'courseInfoAtom',
  default: selector({
    key: 'courseInfoAtom/Default',
    get: async () => {
      return await getCourseInfo()
    }
  })
})

/* -------------------------
*          FILTER
---------------------------*/
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

export const currentFilteredDataAtom = atom({
  key: 'currentFilteredDataAtom',
  default: []
})


export const courseSearchInputAtom = atom({
  key: 'courseSearchInputAtom',
  default: ""
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


/* -------------------
*    TARGET REF
----------------------*/

export const feedbackFieldRefAtom = atom({
  key: "feedbackFieldRefAtom",
  default: null
})
