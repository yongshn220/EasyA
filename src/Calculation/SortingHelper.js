export default class SortingHelper {

  static sortByGrade(avgData) {
    let avgArray = Object.entries(avgData).map(([key, value]) => ({ name:key, ...value }));
    avgArray = this.filterInvalids(avgArray);
    const result = avgArray.sort((courseA, courseB) => {
      const gradeA = (courseA.Grade !== {})? courseA.Grade : courseA.OverallGrade;
      const gradeB = (courseB.Grade !== {})? courseB.Grade : courseB.OverallGrade;

      // Compare each grade in descending order
      for (const grade in gradeA) {
        if (grade in gradeA && grade in gradeB) {
          if (gradeA[grade] !== gradeB[grade]) {
            return gradeB[grade] - gradeA[grade];
          }
        }
      }
      return 1;
    })
    return result;
  }

  static sortByStudyingHour(avgData) {
    let avgArray = Object.entries(avgData).map(([key, value]) => ({ name:key, ...value }));
    avgArray = this.filterInvalids(avgArray);
    const result = avgArray.sort((courseA, courseB) => {
      const studyingHoursA = courseA.StudyingHours;
      const studyingHoursB = courseB.StudyingHours;

      // Compare each grade in descending order
      for (const value in studyingHoursA) {
        if (value in studyingHoursA && value in studyingHoursB) {
          if (studyingHoursA[value] !== studyingHoursB[value]) {
            return studyingHoursB[value] - studyingHoursA[value];
          }
        }
      }
      return 1;
    })
    return result;
  }

  static filterInvalids(data) {
    return data.filter((course) => {
      if ("Grade" in course && "OverallGrade" in course && "StudyingHours" in course && Object.keys(course["OverallGrade"]).length !== 0 && Object.keys(course["StudyingHours"]).length !== 0)
        return true
      return false
    })
  }
}
