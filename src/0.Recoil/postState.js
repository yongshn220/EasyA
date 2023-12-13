import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {getPost, getPostIds, getPostIdsByEmail} from "../api/api";
import {authAtom} from "./accountState";


export const storePostIdsAtom = atom({
  key: 'storePostIdsAtom',
  default: selector({
    key: 'postIdsAtom/Default',
    get: async () => {
      const res = await getPostIds()
      if (res.status_code === 200) {
        return res.post_ids
      }
      else return []
    }
  })
})

export const myStorePostIdsAtom = atomFamily({
  key: 'myStorePostIdsAtom',
  default: selectorFamily({
    key: '/Default',
    get: (email) => async ({get}) => {
      const auth = get(authAtom)
      const res = await getPostIdsByEmail(auth, email)
      if (res.status_code === 200) {
        return res.post_ids
      }
      else return []
    }
  })
})

export const storePostAtom = atomFamily({
  key: 'storePostAtom',
  default: selectorFamily({
    key: 'postAtom/Default',
    get: (id) => async ({get}) => {
      const auth = get(authAtom)
      const res = await getPost(auth, id)
      if (res.status_code === 200) {
        return res.post
      }
      else return null
    },
  })
});
