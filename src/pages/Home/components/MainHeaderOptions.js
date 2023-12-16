import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {COLOR} from "../../../util/util";
import AvatarMenu from "./AvatarMenu";
import {authAtom, userAtom} from "../../../0.Recoil/accountState";
import {useRecoilValue} from "recoil";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import NotificationModal from "./NotificationModal";
import {useState} from "react";
import {notificationIdsAtom} from "../../../0.Recoil/notificationState";


export default function MainHeaderOptions() {
  const auth = useRecoilValue(authAtom)
  const user = useRecoilValue(userAtom)
  const notification_ids = useRecoilValue(notificationIdsAtom)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate()

  function HandleLogin() { navigate('/login') }
  function HandleSignUp() { navigate('/signup') }

  function handleClickNotification() {
    setIsNotificationOpen(!isNotificationOpen);
  }


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
              notification_ids.length > 0 &&
              <Alert>
                <AlertText>{notification_ids.length}</AlertText>
              </Alert>
            }
            <NotificationsNoneIcon onClick={handleClickNotification} style={{fontSize:'3rem', color:COLOR.fontGray50, cursor:'pointer'}}/>
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
  borderRadius:'50%'
})

const AlertText = styled('div')({
  color:'white',
  fontSize:'1.2rem',
  fontWeight:'700',
})

const AvatarOption = styled('div')({
  flex:1
})
