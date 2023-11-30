
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

export async function resendVerificationEmail(email) {
  try {
    const response = await fetch(`${serverURI}/account/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({email: email})
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


export async function login(email, password) {
  try {
    const response = await fetch(`${serverURI}/account/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: email,
        password,
      }),
    })
    return await response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message };
  }
}

export async function checkTokenValidity(accessToken) {
  try {
    const response = await fetch(`${serverURI}/account/token`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    })
    return await response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message };
  }
}


export async function createPost(user, images, title, price, description) {
  try {
    console.log(user)
    const response = await fetch(`${serverURI}/post/create`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${user.accessToken}`
      },
      body: JSON.stringify({
        email: user.email,
        images,
        title,
        price,
        description,
        comments: []
      })
    })
    return await response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message };
  }
}

export async function getPosts() {
  try {
    const response = await fetch(`${serverURI}/post/all`, {
      method: "GET",
    })
    console.log(response)
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}

export async function getPost(_id) {
  try {
    const response = await fetch(`${serverURI}/post/one/?_id=${_id}`, {
      method: "GET",
    })
    console.log(response.post)
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}

export async function addComment(user, postId, text) {
  try {
    const response = await fetch(`${serverURI}/comment/add_comment`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${user.accessToken}`
      },
      body: JSON.stringify({
        postId: postId.toString(),
        comment: {
          username: `${user.major} major`,
          email: user.email,
          text: text,
          replies: [],
        }
      })
    })
    return await response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message };
  }
}


export async function addReply(user, commentId, text) {
  try {
    const response = await fetch(`${serverURI}/comment/add_reply`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${user.accessToken}`
      },
      body: JSON.stringify({
        commentId: commentId,
        email: user.email,
        username: user.major,
        text: text,
      })
    })
    return await response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message };
  }
}
