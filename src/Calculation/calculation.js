export default class Calculator {


  static getSummary(courseData) {
    let result = {}
    for (let courseKey of Object.keys(courseData)) {
      const sections = courseData[courseKey];
      const courseAvg = this.getCourseSummary(sections)
      result[courseKey] = courseAvg;
    }
    return result
  }

  static getSummaryWithOption(courseData, ignoreMajors, startYear) {
    let result = {}
    for (let courseKey of Object.keys(courseData)) {

      const major = courseKey.replace(/\d+/g, '');
      if (ignoreMajors.includes(major)) continue;

      const sections = courseData[courseKey];
      const filteredSections = sections.filter((section) => {
        const courseYear = section["course_year"].split(" ")
        return Number(courseYear[1] >= startYear)
      })

      const courseAvg = this.getCourseSummary(filteredSections)
      result[courseKey] = courseAvg;
    }
    return result
  }

  static getCourseSummary(sections) {
    const filteredSections = this.filterSections(sections)

    const courseAvg = this.getAvgOfEvalData(filteredSections)
    return courseAvg;
  }

  static filterSections(sections) {
    return sections.filter(item => {
      return !(item["course_section"][0] === "R" ||
        item["course_section"] === "90" ||
        item["course_year"].includes("Summer") ||
        item["course_year"].includes("Winter"));
    });
  }

  static getAvgOfEvalData(sections) {
    const sectionEvals = sections.map((section) => section.eval_data);

    let result = {
      Grade: {},
      OverallGrade: {},
      StudyingHours: {},
    }

    let numOfSections = {
      Grade: 0,
      OverallGrade: 0,
      StudyingHours: 0,
    }

    for (let sectionEval of sectionEvals) {
      for (let evalKey of Object.keys(sectionEval)) {
        if (!(evalKey in result)) continue

        let numOfStudents = 0

        for (let innerKey of Object.keys(sectionEval[evalKey])) {
          numOfStudents += Number(sectionEval[evalKey][innerKey])
        }

        if (numOfStudents === 0) continue

        numOfSections[evalKey] += 1

        for (let innerKey of Object.keys(sectionEval[evalKey])) {
          if (!(innerKey in result[evalKey])) result[evalKey][innerKey] = 0
          result[evalKey][innerKey] += Math.round((Number(sectionEval[evalKey][innerKey]) / numOfStudents) * 100)
        }
      }
    }

    for (let evalKey of Object.keys(result)) {
      for (let innerKey of Object.keys(result[evalKey])) {
        result[evalKey][innerKey] = Math.round(result[evalKey][innerKey] / numOfSections[evalKey])
      }
    }

    return result
  }
}
