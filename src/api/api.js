
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


export async function signup(email, password, major) {
  try {
    const response = await fetch(`${serverURI}/account/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({
        email,
        password,
        major,
        is_verified: false,
        verification_code: null,
      }),
    })
    return await response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message };
  }
}


export async function verifyEmail(token) {
  const response = await fetch(`${serverURI}/account/verify?token=${token}`, {
    method: "GET"
  })
  return await response.json()
}
