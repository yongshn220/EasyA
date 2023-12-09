

export class LocalStorageHelper {
  static setAuth(access_token) {
    const auth = {loggedIn: true, accessToken: access_token}
    localStorage.setItem('auth', JSON.stringify(auth))
    return auth
  }

  static removeAuth() {
    localStorage.removeItem("auth")
  }

  static getAuth() {
    return JSON.parse(localStorage.getItem('auth'))
  }
}
