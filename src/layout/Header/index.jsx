import { AccountCircle, Close, ShoppingCart } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import { logout } from 'components/Auth/userSlice';
import { cartItemCountSelector } from 'components/Cart/selector';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './styles.scss';
import DrawerComp from './Drawer';

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const cartItemCount = useSelector(cartItemCountSelector);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!LoggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEL] = useState(null);
  const handleUserClick = (event) => {
    setAnchorEL(event.currentTarget);
  };
  const handleUserClose = () => {
    setAnchorEL(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEL(null);
  };
  const handleCartClick = () => {
    navigate('/cart');
  };

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
          {isMatch ? (
            <>
              <DrawerComp isLoggedIn={isLoggedIn} onClickOpen={handleClickOpen} onClickClose={handleUserClick} />
            </>
          ) : (
            <>
              <MenuIcon className="menuButton" />
              <Typography component="div" className="title">
                <Link className="link" to="/">
                  Manh Tai
                </Link>
              </Typography>

              <NavLink to="/products" className="link">
                <Button color="inherit">Products</Button>
              </NavLink>
              <NavLink to="/counter" className="link">
                <Button color="inherit">Counter</Button>
              </NavLink>

              <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {!isLoggedIn && (
                <Button onClick={handleClickOpen} color="inherit">
                  Login
                </Button>
              )}
              {isLoggedIn && (
                <IconButton color="inherit" onClick={handleUserClick}>
                  <AccountCircle />
                </IconButton>
              )}
            </>
          )}
        </Toolbar>

        <Dialog disableEscapeKeyDown open={open}>
          <IconButton className="closeButton" onClick={handleClose}>
            <Close />
          </IconButton>

          <DialogContent>
            {mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                    Don't have an account. Register here
                  </Button>
                </Box>
              </>
            )}

            {mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                    Already have an account. Login here
                  </Button>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogoutClick}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
