import NotificationItem from "./NotificationItem";
import {styled} from "@mui/material/styles";
import {useRecoilValue} from "recoil";
import {Suspense, useEffect, useRef, useState} from "react";
import {authAtom, userAtom} from "../../../0.Recoil/accountState";
import {ErrorBoundary} from "react-error-boundary";
import LoadingCircle from "../../Loading/LoadingCircle";
import {getNotifications} from "../../../api/api";

export default function NotificationModalWrapper({state, setState}) {
  const user = useRecoilValue(userAtom)
  const ref = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest("#notification-icon")) return

      if (ref.current && !ref.current.contains(e.target)) {
        setState(false)
      }
    }
    if (state) {
      document.addEventListener("mouseup", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [state, setState]);

  if (!user) return <></>

  return (
    <Base isOpen={state} ref={ref}>
      <NotificationHeader>
        Notifications
      </NotificationHeader>
      <ErrorBoundary fallback={<div>Currently not available.</div>}>
        {state && <NotificationModal state={state}/>}
      </ErrorBoundary>
      <NotificationFooter/>
    </Base>
  )
}

function NotificationModal({state}) {
  const auth = useRecoilValue(authAtom)
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!state) return setNotifications([])

    setIsLoading(true)
    let isMounted = true;

    getNotifications(auth).then((res) => {
      if (isMounted && res.status_code === 200) {
        setNotifications(res.notifications)
        setIsLoading(false)
      }
      else return []
    })

    return () => {
      isMounted = false
      setIsLoading(false)
    }
  }, [auth, state])


  return (
    <NotificationList>
      <Suspense fallback={<LoadingCircle/>}>
        {
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification}/>
          ))
        }
      </Suspense>
      {isLoading && <LoadingCircle/>}
    </NotificationList>
  )
}

const Base = styled('div')(({ isOpen }) => ({
  position:'absolute',
  display: isOpen ? 'block' : 'none',
  width: '38rem',
  top: '7.5rem',
  right:'0.5rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  zIndex: 1000,
}));

const NotificationHeader = styled('div')({
  padding: '10px',
  borderBottom: '0.5px solid #ccc',
  fontWeight: 'bold',
  fontSize:'1.2rem',
});

const NotificationList = styled('ul')({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  maxHeight: '300px', // Fixed height with scroll for long lists
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
});

const NotificationFooter = styled('div')({
  padding: '10px',
  borderTop: '0.5px solid #ccc',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});
