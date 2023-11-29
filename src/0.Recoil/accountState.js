import {atom} from "recoil";

export const emptyUser = {email: "", accessToken: "", loggedIn: false}

export const userAtom = atom({
  key: 'userAtom',
  default: JSON.parse(localStorage.getItem('user'))?? emptyUser

})

export const userAccessTokenAtom = atom({
  key: 'userAccessTokenAtom',
  default: null
})
