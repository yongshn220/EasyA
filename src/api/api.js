
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

export async function createPost(auth, user, images, title, price, description) {
  try {
    const response = await fetch(`${serverURI}/post/create_post`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${auth.accessToken}`
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

export async function getPostIds() {
  try {
    const response = await fetch(`${serverURI}/post/get_post_ids`, {
      method: "GET",
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}

export async function getPostIdsByEmail(auth, email) {
  try {
    const response = await fetch(`${serverURI}/post/get_post_ids_by_email`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify({email})
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}

export async function getPost(auth, _id) {
  try {
    const response = await fetch(`${serverURI}/post/get_post?_id=${_id}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      },
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}

export async function deletePost(auth, _id) {
  try {
    const response = await fetch(`${serverURI}/post/delete_post/${_id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      },
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}

export async function updatePost(auth, postUpdateRequest, _id) {
  try {
    const response = await fetch(`${serverURI}/post/update_post/${_id}`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify({
        images_to_add: postUpdateRequest.images_to_add,
        images_to_delete: postUpdateRequest.images_to_delete,
        title: postUpdateRequest.title,
        price: postUpdateRequest.price,
        description: postUpdateRequest.description
      })
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}

export async function addComment(auth, user, postId, text, is_secret) {
  try {
    const response = await fetch(`${serverURI}/comment/add_comment`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify({
        postId: postId.toString(),
        comment: {
          username: `${user.major} major`,
          email: user.email,
          text: text,
          replies: [],
          is_secret: is_secret,
        }
      })
    })
    return await response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message };
  }
}

export async function addReply(auth, user, postId, commentId, text, is_secret) {
  try {
    const response = await fetch(`${serverURI}/comment/add_reply`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify({
        postId: postId.toString(),
        commentId: commentId.toString(),
        reply: {
          username: `${user.major} major`,
          email: user.email,
          text: text,
          is_secret: is_secret,
        }
      })
    })
    return await response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message };
  }
}


export async function updateProfile(auth, profileUpdateRequest) {
  try {
    const response = await fetch(`${serverURI}/profile/update_profile`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify({
        major: profileUpdateRequest.major,
      })
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}


export async function createNotification(auth, type, fromUserId, toUserId, postId, commentId) {
  try {
    const response = await fetch(`${serverURI}/notification/create_notification`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify({
        type: type,
        fromUserId: fromUserId,
        toUserId: toUserId,
        postId: postId,
        commentId: commentId,
        isRead: false,
      })
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message }
  }
}
