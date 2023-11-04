import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PopupMessage({severity, state, setState, message}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setState(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={state}
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
      >
        <Alert severity={severity} sx={{ width: '100%' }}>
          <span style={{ fontSize: '1.4rem' }}>{message}</span>
        </Alert>
      </Snackbar>
    </div>
  );
}
