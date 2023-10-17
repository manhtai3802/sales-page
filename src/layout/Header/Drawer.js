import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { cartItemCountSelector } from 'components/Cart/selector';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DrawerComp = ({ isLoggedIn, onClickOpen, onClickClose }) => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const cartItemCount = useSelector(cartItemCountSelector);

  const handleCartClick = () => {
    navigate('/cart');
  };
  const handleProductsClick = () => {
    navigate('/products');
  };

  const handleClickOpen = () => {
    onClickOpen();
  };

  const handleUserClick = (event) => {
    onClickClose(event);
  };

  return (
    <>
      <MenuIcon className="menuButton" onClick={() => setOpenDrawer(!openDrawer)} />
      <Typography sx={{ fontSize: '2rem', paddingLeft: '10%' }} onClick={handleProductsClick}>
        Manh Tai
      </Typography>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItemButton>
            <ListItemText primary="Products" onClick={handleProductsClick} />
          </ListItemButton>

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
        </List>
      </Drawer>

      <IconButton
        size="large"
        aria-label="show 4 new mails"
        color="inherit"
        onClick={handleCartClick}
        sx={{ color: 'white', marginLeft: 'auto' }}
      >
        <Badge badgeContent={cartItemCount} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>
    </>
  );
};

export default DrawerComp;
