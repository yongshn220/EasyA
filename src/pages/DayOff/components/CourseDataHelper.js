
import courseData from './2024SpringData.json'


export function getCourse(crsId) {
  const crs = courseData[crsId]
  return JSON.parse(JSON.stringify(crs))
}

export function getLecture(crsId, lecId) {
  const crs = getCourse(crsId)
  let lec = crs["LEC"][lecId]
  lec.fullId = `${crs.id} ${crs.number} ${lec.id}`
  lec.title = crs.title
  return lec
}

export function getRecitation(crsId, lecId, recId) {
  const lec = getLecture(crsId, lecId)
  let rec = lec["REC"][recId]
  rec.fullId = `${crsId} ${rec.id}`
  rec.title = "Recitation"
  return rec
}

export function getLaboratory(crsId, lecId, labId) {
  const lec = getLecture(crsId, lecId)
  let lab = lec["LAB"][labId]
  lab.fullId = `${crsId} ${lab.id}`
  lab.title = "Laboratory"
  return lab
}
