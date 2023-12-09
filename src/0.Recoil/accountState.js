import {atom, selector} from "recoil";
import {LocalStorageHelper} from "../util/localStorageHelper";
import {checkTokenValidity} from "../api/api";

export const emptyAuth = {loggedIn: false, accessToken: ""}

export const authAtom = atom({
  key: 'authAtom',
  default: LocalStorageHelper.getAuth()?? emptyAuth
})

export const userAtom = atom({
  key: 'userAtom',
  default: selector({
    key: 'userAtom/Default',
    get: async ({get}) => {
      const auth = get(authAtom)
      if (!auth.loggedIn) return null

      const res = await checkTokenValidity(auth.accessToken)
      if (res.status_code === 200) {
        return res.user
      }
      else return null
    }
  })
})
