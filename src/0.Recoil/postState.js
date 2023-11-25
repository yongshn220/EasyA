import {atom, atomFamily, selector, selectorFamily} from "recoil";
import {TServer} from "../pages/TempServer";




export const storePostIdsAtom = atom({
  key: 'storePostIdsAtom',
  default: selector({
    key: 'postIdsAtom/Default',
    get: async () => {
      return TServer.postList.map((post) => post.id)
    }
  })
})

export const storePostAtom = atomFamily({
  key: 'storePostAtom',
  default: selectorFamily({
    key: 'postAtom/Default',
    get: (id) => async () => {
      return TServer.postList.find((post) => post.id === id)
    },
  })
});
