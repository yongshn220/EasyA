

export default class FilterHelper {

  static filterByMajor(data, filteredMajors) {
    return data.filter((course) => !filteredMajors.includes(course.name.substring(0, 3)))
  }

  static filterBySBC(data, filteredSBCs) {
    return data.filter((course) => {
      if (course["SBC"]?.length === 0 && !filteredSBCs.includes("None")) return true

      for (let sbc of course["SBC"]) {
        if (!filteredSBCs.includes(sbc)) {
          return true
        }
      }
      return false
    })
  }

  static getIntersectionOfData(dataA, dataB) {
    let result = []

    let mi = 0
    let si = 0
    while (mi < dataA.length && si < dataB.length) {
      if (dataA[mi]["_id"] === dataB[si]["_id"]) {
        result.push(dataA[mi])
        mi += 1
        si += 1
        continue
      }

      if (dataA[mi]["_id"] < dataB[si]["_id"])
        mi += 1
      else
        si += 1
    }
    return result
  }
}
