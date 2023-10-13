import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductThumbnail from 'Product/components/ProductThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { decrementItem, incrementItem, removeFromCart } from './cartSlice';
import { cartItemTotalSelector } from './selector';

CartFeature.propTypes = {};

const useStyles = makeStyles(({ theme }) => ({
  root: {},

  cart: {
    display: 'flex',
  },

  salePrice: {
    marginTop: '0.8rem',
    fontWeight: 600,
  },

  quantityCart: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },

  thumbnail: {
    width: '100px',
  },
}));

function CartFeature(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const cartItemTotal = useSelector(cartItemTotalSelector);

  const handleIncrement = (itemId) => {
    dispatch(incrementItem(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementItem(itemId));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <Box>
      {cartItemTotal}
      {cart.cartItem.map((val) => (
        <Box key={val.id} className={classes.root}>
          <Box className={classes.cart}>
            <Box className={classes.thumbnail}>
              <ProductThumbnail product={val.product} />
            </Box>
            <Box>{val.product.name}</Box>

            <Box className={classes.salePrice}>{val.product.salePrice}</Box>

            <Box className={classes.quantityCart}>
              <IconButton onClick={() => handleDecrement(val.product.id)}>
                <RemoveCircleOutline />
              </IconButton>
              <b>{val.quantity}</b>
              <IconButton onClick={() => handleIncrement(val.product.id)}>
                <AddCircleOutline />
              </IconButton>
            </Box>

            <Box className={classes.salePrice}>{val.quantity * val.product.salePrice}</Box>

            <IconButton onClick={() => handleDeleteItem(val.product.id)}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default CartFeature;
