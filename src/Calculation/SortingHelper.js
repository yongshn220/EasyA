export default class SortingHelper {

  static sortByGrade(avgData) {
    const avgArray = Object.entries(avgData).map(([key, value]) => ({ name:key, ...value }));
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
}
