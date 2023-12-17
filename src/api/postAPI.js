import {serverURI} from "./api";

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

export async function getPostIds(pageNumber) {
  try {
    const response = await fetch(`${serverURI}/post/get_post_ids?page=${pageNumber}`, {
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

export async function getPost(auth, id) {
  try {
    const response = await fetch(`${serverURI}/post/get_post?id=${id}`, {
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

export async function deletePost(auth, id) {
  try {
    const response = await fetch(`${serverURI}/post/delete_post/${id}`, {
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

export async function updatePost(auth, postUpdateRequest, id) {
  try {
    const response = await fetch(`${serverURI}/post/update_post/${id}`, {
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
