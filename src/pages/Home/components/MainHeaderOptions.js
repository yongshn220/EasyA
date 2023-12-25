import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {COLOR} from "../../../util/util";
import AvatarMenu from "./AvatarMenu";
import {authAtom, userAtom} from "../../../0.Recoil/accountState";
import {useRecoilValue} from "recoil";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import NotificationModal from "./NotificationModal";
import {useEffect, useMemo, useState} from "react";
import {getNotificationStatus} from "../../../api/notificationAPI";
import AccountMenu from "./AccountMenu";


export default function MainHeaderOptions() {
  const auth = useRecoilValue(authAtom)
  const user = useRecoilValue(userAtom)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate = useNavigate()

  const userInitial = useMemo(() => {
    return user?.email[0]?.toUpperCase()?? null
  }, [user])

  function HandleLogin() { navigate('/login') }
  function HandleSignUp() { navigate('/signup') }

  function handleClickNotification(e) {
    e.stopPropagation();
    setIsNotificationOpen(!isNotificationOpen);
  }

  useEffect(() => {
    if (auth.loggedIn === false) return

    getNotificationStatus(auth).then((res) => {
      if (res.status_code === 200)
        setUnreadCount(res.unread_count)
    })
  }, [auth, isNotificationOpen])

  return(
    <div>
      <NotificationModal state={isNotificationOpen} setState={setIsNotificationOpen}/>
      {
        (auth.loggedIn === false)?
        <OptionArea>
          <AccountOptionOutlined onClick={HandleLogin}>Log In</AccountOptionOutlined>
          <AccountOptionFilled onClick={HandleSignUp}>Sign up</AccountOptionFilled>
        </OptionArea>
        :
        <OptionArea>
          <NotificationOption>
            {
              unreadCount > 0 &&
              <Alert>
                <AlertText>{unreadCount}</AlertText>
              </Alert>
            }
            <NotificationOptionIcon id="notification-icon" onClick={handleClickNotification}/>
          </NotificationOption>
          <AccountMenu initial={userInitial}/>
        </OptionArea>
      }
    </div>
  )
}

const AccountOptionOutlined = styled('div')({
  fontSize: '1.6rem',
  fontWeight: '500',
  width:'6rem',
  padding:'0.7rem 1.5rem 0.7rem 1.5rem',
  color:COLOR.fontGray50,
  boxShadow: `inset 0 0 0 1px ${COLOR.fontGray30}`,
  borderRadius:'2rem',
  cursor:'pointer',
  '&:hover': {
    backgroundColor:COLOR.fontGray10,
  }
});

const AccountOptionFilled = styled('div')({
  fontSize: '1.6rem',
  fontWeight: '500',
  width:'6rem',
  padding:'0.7rem 1.5rem 0.7rem 1.5rem',
  borderRadius:'2rem',
  color:'white',
  backgroundColor:COLOR.main,
  cursor:'pointer',
});

const OptionArea = styled('div')({
  display:'flex', alignItems:'center', gap: '1rem'
})

const NotificationOption = styled('div')({
  position:'relative',display:'flex', alignItems:'center', height:'100%'
})

const Alert = styled('div')({
  position:'absolute',
  display:'center',
  justifyContent:'center',
  alignItems:'center',
  width:'1.8rem',
  height:'1.8rem',
  right:'-0.3rem',
  top:'-0.3rem',
  backgroundColor:'red',
  borderRadius:'50%',
  border: '1px solid white',
})

const AlertText = styled('div')({
  color:'white',
  fontSize:'1.2rem',
  fontWeight:'700',
})

const NotificationOptionIcon = styled(NotificationsNoneIcon)({
  fontSize:'2.5rem',
  color:COLOR.fontGray50,
  cursor:'pointer',
  '&:hover': { color: COLOR.main, },
})
