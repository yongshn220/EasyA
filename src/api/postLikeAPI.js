

import {serverURI} from "./api";
const postLikeURI = serverURI + "/post_like"

export async function createPostLike(auth, post_id) {
  try {
    const response = await fetch(`${postLikeURI}/add_post_like/${post_id}`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      }
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}


export async function getPostLikeCount(auth, post_id) {
  try {
    const response = await fetch(`${postLikeURI}/get_post_like_count/${post_id}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}


export async function checkUserHasLiked(auth, post_id) {
  try {
    const response = await fetch(`${postLikeURI}/check_user_has_liked/${post_id}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
    return response.json()
  }
  catch (error) {
    return { status_code: 400, error: error.message}
  }
}
