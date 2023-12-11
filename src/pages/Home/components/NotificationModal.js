import NotificationItem from "./NotificationItem";
import {styled} from "@mui/material/styles";


export default function NotificationModal({state}) {
  return (
    <Base isOpen={state}>
      <NotificationHeader>
        Notifications
      </NotificationHeader>
      <NotificationList>
        <NotificationItem/>
      </NotificationList>
      {/*<NotificationFooter>*/}
      {/*  SEE ALL*/}
      {/*</NotificationFooter>*/}
    </Base>
  )
}


const Base = styled('div')(({ isOpen }) => ({
  position:'absolute',
  display: isOpen ? 'block' : 'none',
  width: '350px',
  top: '5.6rem',
  right:'0px',
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
});

const NotificationFooter = styled('div')({
  padding: '10px',
  borderTop: '1px solid #ccc',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});
