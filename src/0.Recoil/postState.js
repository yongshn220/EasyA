import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {getPost, getPostIds, getPostIdsByEmail} from "../api/postAPI";
import {authAtom} from "./accountState";
import {checkUserHasLiked, getPostLikeCount} from "../api/postLikeAPI";


export const storePostIdsAtom = atom({
  key: 'storePostIdsAtom',
  default: selector({
    key: 'postIdsAtom/Default',
    get: async () => {
      const res = await getPostIds(1)
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
    key: 'myStorePostIdsAtom/Default',
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

export const postLikeCountAtom = atomFamily({
  key: 'postLikeCountAtom',
  default: selectorFamily({
    key: 'postLikeCountAtom/Default',
    get: (id) => async ({get}) => {
      console.log("postlikecountatom")
      const auth = get(authAtom)
      const res = await getPostLikeCount(auth, id)
      if (res.status_code === 200) {
        return res.post_like_count
      }
      else return 0
    }
  })
})


export const checkUserHasLikedAtom = atomFamily({
  key: 'checkUserHasLikedAtom',
  default: selectorFamily({
    key: 'checkUserHasLikedAtom/Default',
    get: (id) => async ({get}) => {
      const auth = get(authAtom)
      const res = await checkUserHasLiked(auth, id)
      if (res.status_code === 200) {
        return res.has_liked
      }
      else return false
    }
  })
})


