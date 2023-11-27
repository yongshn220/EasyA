import {atom} from "recoil";


export const userAtom = atom({
  key: 'userAtom',
  default: {
    loggedIn: false,
    email: "",
    accessToken: null,
  }
})

export const userAccessTokenAtom = atom({
  key: 'userAccessTokenAtom',
  default: null
})
