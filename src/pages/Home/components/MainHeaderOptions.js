import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {COLOR} from "../../../util/util";
import AvatarMenu from "./AvatarMenu";
import {authAtom, userAtom} from "../../../0.Recoil/accountState";
import {useRecoilValue} from "recoil";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import NotificationModal from "./NotificationModal";
import {useEffect, useState} from "react";
import {getNotificationStatus} from "../../../api/notificationAPI";


export default function MainHeaderOptions() {
  const auth = useRecoilValue(authAtom)
  const user = useRecoilValue(userAtom)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate = useNavigate()

  function HandleLogin() { navigate('/login') }
  function HandleSignUp() { navigate('/signup') }

  function handleClickNotification(e) {
    e.stopPropagation();
    setIsNotificationOpen(!isNotificationOpen);
  }

  useEffect(() => {
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
        <UserOptionArea>
          <GuestOptionItem onClick={HandleLogin}>Login</GuestOptionItem>
          <GuestOptionItem onClick={HandleSignUp}>Sign up</GuestOptionItem>
        </UserOptionArea>
        :
        <UserOptionArea>
          <NotificationOption>
            {
              unreadCount > 0 &&
              <Alert>
                <AlertText>{unreadCount}</AlertText>
              </Alert>
            }
            <NotificationOptionIcon id="notification-icon" onClick={handleClickNotification}/>
          </NotificationOption>
          <AvatarOption>
            <AvatarMenu user={user}/>
          </AvatarOption>
        </UserOptionArea>
      }
    </div>
  )
}

const GuestOptionItem = styled('div')({
  display:'flex',
  fontSize: '1.8rem',
  fontWeight: '700',
  alignItems:'center',
  color: 'black',
  cursor:'pointer',
});

const UserOptionArea = styled('div')({
  display:'flex', alignItems:'center', gap: '2rem'
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

const AvatarOption = styled('div')({
  flex:1
})

const NotificationOptionIcon = styled(NotificationsNoneIcon)({
  fontSize:'2.5rem',
  color:COLOR.fontGray50,
  cursor:'pointer',
  '&:hover': {
    color: COLOR.mainYellow,
  },
})
