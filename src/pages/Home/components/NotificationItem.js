import {styled} from "@mui/material/styles";
import {useRecoilValue} from "recoil";
import {storePostAtom} from "../../../0.Recoil/postState";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {COLOR} from '../../../util/util'
import TimeHelper from '../../../util/timeHelper'
import {useEffect} from "react";
import {markNotification} from "../../../api/api";
import {authAtom} from "../../../0.Recoil/accountState";
import {useNavigate} from "react-router-dom";

export default function NotificationItem({notification}) {
  const auth = useRecoilValue(authAtom)
  const post = useRecoilValue(storePostAtom(notification?.postId))
  const fromType = notification.type
  const toType = notification.type === "reply"? "comment" : "post"
  const navigate = useNavigate()

  useEffect(() => {
    if (!notification || notification.isRead) return

    markNotification(auth, notification.id).then().catch((e) => {
      console.log("Fail to mark notification read. ", e)
    })
  }, [auth, notification])


  if (!notification) return <></>

  function handleClickNotification() {
    navigate(`/store/post/${notification.postId}`)
  }

  return (
    <Base onClick={handleClickNotification}>
      <Content>
        <ContentHeader>
        <IconArea>
          <MailIcon style={{color: notification?.isRead? "black" : COLOR.mainYellow}}/>
        </IconArea>
          <div style={{flex: 1, fontWeight:'600', textAlign:'left'}}>Buy&Sell: {post?.title}</div>
          <div style={{fontSize:'1.2rem'}}>{TimeHelper.getTopElapsedStringUntilNow(notification?.timestamp)} ago</div>
        </ContentHeader>
        <ContentInner>
          <div style={{color:COLOR.fontGray50}}>{`Someone added a ${fromType} on your ${toType}.`}</div>
        </ContentInner>
      </Content>
    </Base>
  )
}

const Base = styled('li')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height:'6rem',
  padding: '2rem',
  borderBottom: '1px solid #eee',
  fontSize: '14px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f9f9f9',
  },
});

const IconArea = styled('div')({
  display:'flex',
  height:'100%',
  alignItems:'center',
  justifyContent:'center',
})

const Content = styled('div')({
  display:'flex',
  flex:1,
  flexDirection:'column',
  justifyContent:'center',
  height:'100%',
})

const ContentHeader = styled('div')({
  display:'flex',
  marginBottom:'1rem',
  fontSize:'1.4rem',
})

const ContentInner = styled('div')({
  display:'flex',
  justifyContent:'flex-start',
  textAlign:'left',
  marginLeft:'3rem',
  fontSize:'1.2rem',
})

const MailIcon = styled(MailOutlineIcon)({
  flex:1,
  fontSize:'2.0rem',
  marginRight:'1rem',
})
