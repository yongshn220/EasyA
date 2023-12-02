import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {TServer} from "../pages/TempServer";
import {getPost, getPosts} from "../api/api";
import {userAtom} from "./accountState";


export const tpostListAtom = atom({
  key: 'tstorePostsAtom',
  default: TServer.postList
})

export const storePostIdsAtom = atom({
  key: 'storePostIdsAtom',
  default: selector({
    key: 'postIdsAtom/Default',
    get: async () => {
      const res = await getPosts()
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
    get: (_id) => async ({get}) => {
      const user = get(userAtom)
      const res = await getPost(user, _id)
      if (res.status_code === 200) {
        return res.post
      }
      else return null
    },
  })
});
