

export default class TimeHelper {
  static formatTimestamp(timestamp) {
    timestamp = timestamp * 1000 // JS timestamp is millisecond. -> * 1000
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);
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

  static getTimeNow() {
    return new Date().getTime();
  }

  static getElapsedSeconds(startTime, endTime) {
    let miliSecs = endTime - startTime;
    return Math.floor(miliSecs / 1000);
  }

  static getElapsedMinutes(startTime, endTime) {
    let secs = this.getElapsedSeconds(startTime, endTime);
    return Math.floor(secs / 60)
  }

  static getElapsedHours(startTime, endTime) {
    let mins = this.getElapsedMinutes(startTime, endTime);
    return Math.floor(mins / 60)
  }

  static getElapsedDays(startTime, endTime) {
    let hrs = this.getElapsedHours(startTime, endTime);
    return Math.floor(hrs / 24)
  }

  static getTopElapsedString(startTime, endTime) {
    let days = this.getElapsedDays(startTime, endTime);
    if (days !== 0) return days + "d";

    let hrs = this.getElapsedHours(startTime, endTime);
    if (hrs !== 0) return hrs + "h";

    let mins = this.getElapsedMinutes(startTime, endTime);
    if (mins !== 0) return mins + "m";

    let secs = this.getElapsedSeconds(startTime, endTime);
    return secs + "s";
  }

  static getTopElapsedStringUntilNow(timestamp) {
    return this.getTopElapsedString(timestamp * 1000, this.getTimeNow());
  }
}
