import {serverURI} from "./api";

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
