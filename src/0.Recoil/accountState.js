import {atom} from "recoil";

export const emptyUser = {loggedIn: false, accessToken: "", email: "", major: ""}

export const userAtom = atom({
  key: 'userAtom',
  default: JSON.parse(localStorage.getItem('user'))?? emptyUser

})

export const userAccessTokenAtom = atom({
  key: 'userAccessTokenAtom',
  default: null
})
