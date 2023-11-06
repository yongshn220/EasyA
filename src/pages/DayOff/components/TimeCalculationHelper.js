

export function h24toh12(hour) {
  if (hour === 0 || hour === 24) {
    return '12 am';
  } else if(hour === 12) {
    return '12 pm';
  } else if(hour < 12) {
    return `${hour} am`;
  } else {
    return `${hour - 12} pm`;
  }
}

export function courseToTask(course) {
  const timeRange = CourseTimeToTimeRange(course.time)
  const dayIndices = dayStringToDayIndices(course.day)
  return dayIndices.map((index) => ({
      id: course.id,
      fullId: course.fullId,
      title: course.title,
      time: course.time,
      building: course.building,
      instructor: course.instructor,
      startTime: timeRange[0],
      endTime: timeRange[1],
      mLength: timeRange[1] - timeRange[0],
      dayIndex: index,
    }
  ))
}

export function coursesToTimeSet(courses) {
  let mergedTimeSet = new Set()
  for (let course of courses) {
    mergedTimeSet = new Set([...mergedTimeSet, ...dayTimeToTimeSet(course.day, course.time)])
  }
  return mergedTimeSet
}

export function dayTimeToTimeSet(courseDay, courseTime) {
  const dayIndices = dayStringToDayIndices(courseDay)
  const timeRange = CourseTimeToTimeRange(courseTime);
  const startMinute =  timeRange[0]
  const endMinute =  timeRange[1]

  let timeSet = new Set()
  for (let dayIndex of dayIndices) {
    for (let sm = startMinute; sm < endMinute; sm += 10) {
      timeSet.add(daytimeIndexToKey(dayIndex, sm))
    }
  }
  return timeSet
}

export function CourseTimeToTimeRange(courseTime) {
  // Split the input string into start and end times
  try {
    const [startTime, endTimeWithPeriod] = courseTime.split('-');
    let [startHours, startMinutes] = startTime.split(':').map(Number);

    const period = endTimeWithPeriod.slice(-2);
    let [endHours, endMinutes] = endTimeWithPeriod.slice(0, -2).split(':').map(Number);

    if (period === 'PM' && endHours !== 12) {
      if (startHours + 12 <= endHours + 12) {
        startHours += 12
        endHours += 12
      }
      else {
        endHours += 12
      }
    }

    return [startHours * 60 + startMinutes, endHours * 60 + endMinutes];
  }
  catch (e) {
    console.log(courseTime)
    return [0,0,0,0]
  }
}

export function dayStringToDayIndices(daysStr) {
  const dayMap = { M: 0, TU: 1, W: 2, TH: 3, F: 4 };
  const daysArr = [];

  // Regular expressions to match the patterns in the string
  const regex = /M|TU|W|TH|F/g;

  // Find all matches for the day abbreviations
  let matches;
  while ((matches = regex.exec(daysStr)) !== null) {
    daysArr.push(dayMap[matches[0]]);
  }
  return daysArr;
}

export function daytimeIndexToKey(dayIndex, timeBlock) {
  return `${dayIndex}-${timeBlock}`
}

export function daytimeKeyToIndex(daytimeKey) {
  try {
    const timeBlock = daytimeKey.split("-")
    return [Number(timeBlock[0]), Number(timeBlock[1])]
  }
  catch (e) {
    console.log("ERR: TimeCalculationHelper.daytimeKeyToIndex")
    return [0, 0]
  }
}
