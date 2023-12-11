import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/material/styles";


export default function NotificationItem() {
  return (
    <Base>
      <div style={{display:'flex'}}>
        <Avatar sx={{width:'2rem', height:'2rem', marginRight:'1rem'}}/>
        <div style={{display:'flex', flexDirection:'column'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
            <div style={{fontWeight:'600'}}>Developer</div>
            <div>just now</div>
          </div>
          <div style={{display:'flex', justifyContent:'flex-start', textAlign:'left'}}>
            <div>Notification feature will be added soon. Thank you!</div>
          </div>
        </div>
      </div>
    </Base>
  )
}

const Base = styled('li')({
  padding: '10px',
  borderBottom: '1px solid #eee',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#f9f9f9',
  },
});
