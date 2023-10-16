import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function PopupMessage({state, setState, message}) {

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
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
      />
    </div>
  );
}
