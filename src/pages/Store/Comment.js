import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";
import {useMemo, useState} from "react";
import CreateReply from "./CreateReply";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../0.Recoil/accountState";
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';


export default function Comment({postId, comment}) {
  const user = useRecoilValue(userAtom)
  const [openReply, setOpenReply] = useState(false)

  const isMySecretComment = useMemo(() => (
    comment.is_secret && comment.email === user.email
  ), [comment, user])

  return (
    <Base>
      <User>{comment.username}</User>
      <Text>
        {
          isMySecretComment &&
          <Tooltip
            title="Only author and commenter can see it."
            componentsProps={{tooltip: {sx: {fontSize: '1.2rem'}}}}
            sx={{ cursor: 'pointer', marginRight:'0.5rem' }}
          >
            <LockIcon/>
          </Tooltip>
        }
        {comment.text}
      </Text>
      <Reply onClick={() => setOpenReply(!openReply)}>Reply</Reply>
      {
        comment.replies.map(reply => (
          <InnerBase>
            <User>{reply.username}</User>
            <Text>
              {
                isMySecretComment &&
                <Tooltip
                  title="Only author and commenter can see it."
                  componentsProps={{tooltip: {sx: {fontSize: '1.2rem'}}}}
                  sx={{ cursor: 'pointer', marginRight:'0.5rem' }}
                >
                  <LockIcon/>
                </Tooltip>
              }
              {reply.text}
            </Text>
          </InnerBase>
        ))
      }
      { openReply && <CreateReply postId={postId} commentId={comment._id}/> }
    </Base>
  )
}

const Base = styled('div')({
  display:'flex',
  flexDirection:'column',
  paddingLeft:'1rem',
  justifyContent:'center',
  paddingTop:'1rem',
  paddingBottom:'1rem',
  borderBottom: `0.5px solid ${COLOR.lineGray}`,
});

const InnerBase = styled('div')({
  display:'flex',
  flexDirection:'column',
  paddingLeft:'1rem',
  justifyContent:'center',
  marginTop:'1rem',
  paddingTop:'1rem',
  borderLeft: `2px solid ${COLOR.lineGray}`,
});

const User = styled('div')({
  fontSize: '1.6rem',
  fontWeight:'700',
  textAlign:'left',
});

const Text = styled('div')({
  fontSize: '1.6rem',
  textAlign:'left',
  paddingTop:'1rem',
  paddingBottom:'1rem',
  color: 'black',
  marginTop:'0.5rem',
})

const Reply = styled('div')({
  fontSize: '1.2rem',
  fontWeight:'800',
  textAlign:'left',
  color: COLOR.fontGray50,
  marginTop:'0.5rem',
  cursor:'pointer',
})
