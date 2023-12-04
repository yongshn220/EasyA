export function formatTimestamp(timestamp) {
  timestamp = timestamp * 1000 // JS timestamp is millisecond.
  // Create a new Date object from the timestamp
  const date = new Date(timestamp);
  console.log(17016619512)
  console.log(date)
  // Extract the components
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate(); // getDate() returns 1-31
  const hours = date.getHours(); // getHours() returns 0-23
  const minutes = date.getMinutes(); // getMinutes() returns 0-59

  // Format each component to ensure two digits
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Construct the formatted string
  return `${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes}`;
}
