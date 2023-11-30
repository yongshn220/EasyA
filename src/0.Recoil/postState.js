import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {TServer} from "../pages/TempServer";
import {getPost, getPosts} from "../api/api";


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
        console.log(res.posts)
        return res.posts.map(post => post._id)
      }
      else return []
    }
  })
})

export const storePostAtom = atomFamily({
  key: 'storePostAtom',
  default: selectorFamily({
    key: 'postAtom/Default',
    get: (_id) => async () => {
      const res = await getPost(_id)
      console.log(res)
      if (res.status_code === 200) {
        return res.post
      }
      else return null
    },
  })
});
