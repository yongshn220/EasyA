

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
  const timeRange = convertTimeRange(course.time)
  const dayIndexes = convertDaysToIndices(course.day)
  return dayIndexes.map((index) => ({
      id: course.id,
      title: course.title,
      time: course.time,
      building: course.building,
      instructor: course.instructor,
      startTime: (timeRange[0] * 60) + timeRange[1],
      endTime: (timeRange[2] * 60) + timeRange[3],
      mLength: (timeRange[2] - timeRange[0]) * 60 + (timeRange[3] - timeRange[1]),
      dayIndex: index,
    }
  ))
}

function convertTimeRange(timeRange) {
  // Split the input string into start and end times
  const [startTime, endTimeWithPeriod] = timeRange.split('-');

  // Extract the period (AM/PM) from the end time
  const period = endTimeWithPeriod.slice(-2);
  let [endHours, endMinutes] = endTimeWithPeriod.slice(0, -2).split(':').map(Number);

  // Convert end time to 24-hour format if 'PM' is specified
  if (period === 'PM' && endHours !== 12) {
    endHours += 12;
  } else if (period === 'AM' && endHours === 12) {
    endHours = 0; // Midnight case
  }

  let [startHours, startMinutes] = startTime.split(':').map(Number);

  // If end time is PM (except 12pm) and start time is less than end-time, then start-time is PM
  if (period === 'PM' && endHours !== 12 && endHours > startHours) {
    startHours += 12;
  }

  return [startHours, startMinutes, endHours, endMinutes];
}

function convertDaysToIndices(daysStr) {
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


/*
* {
      name: 'CSE101',
      dayIndex: 1, // Tuesday
      startTime: 8*60+20,
      mLength: 90,
      startHour: 8, // 8 AM
      startMinute: 20,
      endHour: 9, // 9 AM
      endMinute: 50
    },
* */
