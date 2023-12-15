import NotificationItem from "./NotificationItem";
import {styled} from "@mui/material/styles";
import {notificationIdsAtom} from "../../../0.Recoil/notificationState";
import {useRecoilValue} from "recoil";
import {Suspense, useEffect, useRef} from "react";
import {userAtom} from "../../../0.Recoil/accountState";
import {ErrorBoundary} from "react-error-boundary";
import LoadingCircle from "../../Loading/LoadingCircle";

export default function NotificationModalWrapper({state, setState}) {
  const user = useRecoilValue(userAtom)
  const ref = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(false)
      }
    }
    if (state) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state, setState]);

  if (!user) return <></>

  return (
    <Base isOpen={state} ref={ref}>
      <NotificationHeader>
        Notifications
      </NotificationHeader>
      <ErrorBoundary fallback={<div>Currently not available.</div>}>
        <Suspense fallback={<LoadingCircle/>}>
          {state && <NotificationModal/>}
        </Suspense>
      </ErrorBoundary>
      <NotificationFooter/>
    </Base>
  )
}

function NotificationModal() {
  const notification_ids = useRecoilValue(notificationIdsAtom)

  return (
    <NotificationList>
      {
        notification_ids.map((id) => (
          <NotificationItem id={id}/>
        ))
      }
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
