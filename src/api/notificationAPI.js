import {serverURI} from "./api";

export async function getNotifications(auth) {
  try {
    const response = await fetch(`${serverURI}/notification/get_notifications`, {
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

export async function getNotificationStatus(auth) {
  try {
    const response = await fetch(`${serverURI}/notification/get_notification_status`, {
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

export async function markNotification(auth, id) {
  try {
    console.log("in", id)
    const response = await fetch(`${serverURI}/notification/mark_notification/${id}`, {
      method: "PATCH",
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
