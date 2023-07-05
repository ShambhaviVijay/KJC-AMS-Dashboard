export function epochToDate(epochTime) {
  const date = new Date(epochTime * 1000) // Convert to milliseconds
  const year = date.getFullYear().toString().slice(-2) // Get the last two digits of the year
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  
  let hours = date.getHours()
  const amPm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12 || 12 // Convert to 12-hour format
  const minutes = ("0" + date.getMinutes()).slice(-2)

  const formattedDate = `${day}-${month}-${year}`
  const formattedTime = `${hours}:${minutes} ${amPm}`

  return `${formattedDate}   ${formattedTime}`
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