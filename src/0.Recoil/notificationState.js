import {atom, selector} from "recoil";
import {getNotifications} from "../api/notificationAPI";
import {authAtom} from "./accountState";

export const notificationsAtom = atom({
  key: 'notificationsAtom',
  default: selector({
    key: 'notificationsAtom/Default',
    get: async ({get}) => {
      const auth = get(authAtom)
      const res = await getNotifications(auth)
      if (res.status_code === 200) {
        console.log(res)
        return res.notifications
      }
      else return []
    }
  })
})
