import {serverURI} from "./api";

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
