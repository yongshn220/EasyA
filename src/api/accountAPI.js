import {serverURI} from "./api";

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
