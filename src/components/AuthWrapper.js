import {useEffect} from "react";
import {checkTokenValidity} from "../api/accountAPI";
import {authAtom, emptyAuth, userAtom} from "../0.Recoil/accountState";
import {LocalStorageHelper} from "../util/localStorageHelper";
import {useRecoilState, useSetRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";


export default function AuthWrapper({children}) {
  const [auth, setAuth] = useRecoilState(authAtom)
  const setUser = useSetRecoilState(userAtom);

  const navigate = useNavigate()

  useEffect(() => {
    if (auth.loggedIn) {
      checkTokenValidity(auth.accessToken).then((res) => {
        if (res.status_code === 200) {
          setUser(res.user)
        }
        else {
          setAuth(emptyAuth)
          LocalStorageHelper.removeAuth()
          navigate('/')
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate])


  return children
}
