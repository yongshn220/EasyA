import data from './2024SpringData.json'
import {CourseTimeToTimeRange, dayStringToDayIndices, daytimeKeyToIndex} from "./TimeCalculationHelper";


export function SearchAvailableCourses(filledTimeSet) {
  let availableCourses = []

  Object.entries(data).forEach(([id, course]) => {
    let lectures = Object.values(course["LEC"])
    lectures = filterAvailableLectures(filledTimeSet, lectures)
    filterAvailableRECandLAB(filledTimeSet, lectures)

    course["LEC"] = []
    for (let lec of lectures) {
      if (!isObjEmpty(lec["REC"]) && lec["availableREC"]?.length <= 0)
        continue
      if (!isObjEmpty(lec["LAB"]) && lec["availableLAB"]?.length <= 0)
        continue
      else {
        course["LEC"].push(lec)
      }
    }
    if (course["LEC"].length > 0) {
      availableCourses.push(course)
    }
  })

  return availableCourses
}

function filterAvailableLectures(filledTimeSet, lectures) {
  return lectures.filter(lecture => (
    isDayTimeAvailable(filledTimeSet, lecture.day, lecture.time)
  ))
}

function filterAvailableRECandLAB(filledTimeSet, lectures) {
  for (let lecture of lectures) {
    if (isObjEmpty(lecture["REC"]) === false) {
      let recitations = Object.values(lecture["REC"])
      recitations = recitations.filter((rec) => isDayTimeAvailable(filledTimeSet, rec.day, rec.time))
      lecture["availableREC"] = recitations
    }

    if (isObjEmpty(lecture["LAB"]) === false) {
      let laboratory = Object.values(lecture["LAB"])
      laboratory = laboratory.filter((lab) => isDayTimeAvailable(filledTimeSet, lab.day, lab.time))
      lecture["availableLAB"] = laboratory
    }
  }
}

function isDayTimeAvailable(filledTimeSet, dayString, courseTime) {
  if (dayString === "FLEX" || dayString === "HTBA") return true
  if (!courseTime) return false
  const coureseDayIndexes = dayStringToDayIndices(dayString)

  const timeRange = CourseTimeToTimeRange(courseTime)
  const startTime =  timeRange[0]
  const endTime =  timeRange[1]

  for (const daytimeKey of filledTimeSet) {
    const timeBlockSet = daytimeKeyToIndex(daytimeKey)
    const filledDay = timeBlockSet[0]
    const filledTime = timeBlockSet[1]
    if (coureseDayIndexes.includes(filledDay)) {
      if (filledTime >= startTime && filledTime <= endTime)
        return false
    }
  }
  return true
}


export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0
}
