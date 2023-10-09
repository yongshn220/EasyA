import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {getMajorList, getSummary} from "../api/api";

export const HardwareType = {
  PC: 'hardwareTypePC',
  MOBILE: 'hardwareTypeMobile',
}

export const SBCs = ["ARTS", "GLO", "HUM", "QPS", "SBS", "SNW", "TECH", "USA", "STAS", "EXP+", "SBS+", "STEM+", "CER", "DIV", "ESI", "SPK", "WRTD"]


export const userHardWareTypeAtom = atom({
  key: 'userHardWareTypeAtom',
  default: HardwareType.PC,
})

export const defaultYearAtom = atom({
  key: 'defaultYearAtom',
  default: 2020,
})

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

export const availableMajorListAtom = selector({
  key: 'availableMajorListAtom',
  get: (get) => {
    let allMajors = get(majorListAtom)
    let filteredMajors = get(filteredMajorsAtom)

    return allMajors.filter((major) => !filteredMajors.includes(major));
  }
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


