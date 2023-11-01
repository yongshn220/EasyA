
export async function getSummary(year) {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/summary?year=${year}`, {
    method: "GET",
  })
  return await response.json();
}

export async function getCourseInfo() {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/courseinfo`, {
    method: "GET",
  })
  return await response.json();
}

export async function postFeedback(feedback) {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/postfeedback/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify({ "text": feedback }),
  })
  return await response.json();
}
