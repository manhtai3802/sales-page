import { Close } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Register from 'components/Auth/Register';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles.scss';

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon className="menuButton" />

          <Typography component="div" className="title">
            <Link className="link" to="/">
              Manh Tai
            </Link>
          </Typography>

          <NavLink to="/counter" className="link">
            <Button color="inherit">Counter</Button>
          </NavLink>

          <Button onClick={handleClickOpen} color="inherit">
            Register
          </Button>
        </Toolbar>

        <Dialog disableEscapeKeyDown open={open}>
          <IconButton className="closeButton" onClick={handleClose}>
            <Close />
          </IconButton>

          <DialogContent>
            <Register closeDialog={handleClose} />
          </DialogContent>
        </Dialog>
      </AppBar>
    </Box>
  );
}
