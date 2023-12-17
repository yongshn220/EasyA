import {useEffect, useState} from "react";
import {getPostIds} from "../../api/api";
import {storePostIdsAtom} from "../../0.Recoil/postState";
import {useSetRecoilState} from "recoil";


export default function usePostIdsLoad(pageNumber) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const setPostIds = useSetRecoilState(storePostIdsAtom)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    getPostIds(pageNumber).then((response) => {
      if (response.status_code === 200) {
        const postIds = response.post_ids
        setHasMore(postIds.length > 0)
        setPostIds((prev) => {
          const idSet = new Set([...prev, ...postIds])
          return [...idSet]
        })
      }
      else {
        setError(true);
      }
    }).catch((e) => {
      if (e.name !== 'AbortError') {
        setError(true)
      }
    }).finally(() => {
      setLoading(false)
    })

  }, [setPostIds, pageNumber])

  return {loading, error, hasMore}
}
