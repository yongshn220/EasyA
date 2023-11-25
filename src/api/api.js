
// const serverURI = process.env.REACT_APP_API_SERVER
const serverURI = "http://0.0.0.0:8000"

export async function getSummary(year) {
  const response = await fetch(`${serverURI}/summary?year=${year}`, {
    method: "GET",
  })
  return await response.json();
}

export async function getCourseInfo() {
  const response = await fetch(`${serverURI}/courseinfo`, {
    method: "GET",
  })
  return await response.json();
}

export async function getProfessorSummary(id) {
  const response = await fetch(`${serverURI}/professorSummary?id=${id}`, {
    method: "GET",
  })
  return await response.json();
}

export async function postFeedback(feedback) {
  const response = await fetch(`${serverURI}/postfeedback/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify({ "text": feedback }),
  })
  return await response.json();
}
