export function epochToTime(epochTime, convertToDate = false) {
  const date = new Date(epochTime)
  let hours = date.getHours()
  const amPm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12 || 12 // Convert to 12-hour format
  const minutes = ("0" + date.getMinutes()).slice(-2)
  const formattedTime = `${hours}:${minutes} ${amPm}`
  if (convertToDate){
    const year = date.getFullYear().toString().slice(-2) // Get the last two digits of the year
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    const formattedDate = `${day}-${month}-${year}`
    return `${formattedDate} ${formattedTime}`
  }
  return `${formattedTime}`
}


export function sortFilter(array, type) {
  // Sort by start time
  if (type === "startTime") {
    return array.sort((a, b) => a.startTime - b.startTime);
  }

  // Sort by end time
  else if (type === "endTime") {
    return array.sort((a, b) => a.endTime - b.endTime);
  }

  // Sort by name
  else if (type === "name") {
    // Solution by a famous LLM
    return array.sort((a, b) => a.eventName.localeCompare(b.eventName));
  }

  else {
    return array;
    console.log("ERROR: Invalid sort type")
  }
}


export function showFilter(array, type, time) {
  // Show all Events
  if (type === "all") {
    return array;
  }

  // Show Upcoming only
  else if (type === "upcoming") {
    return array.filter((event) => event.endTime >= time);
  }

  // Show Past-Events only
  else if (type === "past-events") {
    // Solution by a famous LLM
    return array.filter((event) => event.endTime <= time);
  }

  else {
    return array;
    console.log("ERROR: Invalid filter type")
  }
}