import {atom} from "recoil";

export const popupMessageAtom = atom({
  key: 'popupMessageAtom',
  default: {message:"", state:false, severity:"info"}
})
