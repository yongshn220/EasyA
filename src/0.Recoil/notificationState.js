import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {getNotification, getNotificationIds} from "../api/api";
import {authAtom} from "./accountState";

export const notificationIdsAtom = atom({
  key: 'notificationIdsAtom',
  default: selector({
    key: 'notificationIdsAtom/Default',
    get: async ({get}) => {
      const auth = get(authAtom)
      const res = await getNotificationIds(auth)
      if (res.status_code === 200) {
        return res.notification_ids
      }
      else return []
    }
  })
})

export const notificationAtom = atomFamily({
  key: 'notificationAtom',
  default: selectorFamily({
    key: 'notificationAtom/Default',
    get: (id) => async ({get}) => {
      const auth = get(authAtom)
      const res = await getNotification(auth, id)
      if (res.status_code === 200) {
        return res.notification
      }
      else return null
    },
  })
});
