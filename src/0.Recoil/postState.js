import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {TServer} from "../pages/TempServer";


export const tpostListAtom = atom({
  key: 'tstorePostsAtom',
  default: TServer.postList
})

export const storePostIdsAtom = atom({
  key: 'storePostIdsAtom',
  default: selector({
    key: 'postIdsAtom/Default',
    get: async ({get}) => {
      const postList = get(tpostListAtom)
      return postList.map((post) => post.id)
    }
  })
})

export const storePostAtom = atomFamily({
  key: 'storePostAtom',
  default: selectorFamily({
    key: 'postAtom/Default',
    get: (id) => async ({get}) => {
      const postList = get(tpostListAtom)
      return postList.find((post) => post.id === id)
    },
  })
});
