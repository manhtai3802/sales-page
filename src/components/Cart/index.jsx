import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, ButtonBase, Grid, IconButton, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductThumbnail from 'Product/components/ProductThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import { decrementItem, incrementItem, removeFromCart } from './cartSlice';
import { cartItemTotalSelector } from './selector';

CartFeature.propTypes = {};

const useStyles = makeStyles(({ theme }) => ({
  cart: {
    display: 'flex',
    padding: '1.8rem 1.5rem',
    maxHeight: '85%',
    overflowX: 'hidden',
    overflowY: 'auto',
    alignItems: 'center',
    backgroundColor: '#dedddd',
    gap: '2.2rem',
    marginBottom: '2rem',
    borderRadius: '16px',
  },

  root: {
    margin: '10px 0',
  },
  salePrice: {
    marginTop: '0.8rem',
    fontWeight: 600,
  },

  quantityCart: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.5rem 0',
    cursor: 'pointer',
    opacity: 0.875,
    lineHeight: 0.5,
    fontSize: '1.2 rem',

    '&:hover ': {
      opacity: 1,
    },
  },

  cartItem: {
    display: 'flex',
    justifyContent: 'center',
  },

  thumbnail: {
    width: '100px',
  },

  total: {
    top: 0,
    width: '100%',
    padding: '1rem',
    bottom: 0,
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
      <Box className={classes.total}>{`Total: ${cartItemTotal}`}</Box>
      {cart.cartItem.map((val) => (
        <Box className={classes.root}>
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <ProductThumbnail product={val.product} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      {val.product.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <IconButton onClick={() => handleDecrement(val.product.id)}>
                        <RemoveCircleOutline />
                      </IconButton>
                      <b>{val.quantity}</b>
                      <IconButton onClick={() => handleIncrement(val.product.id)}>
                        <AddCircleOutline />
                      </IconButton>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{ cursor: 'pointer' }}
                      variant="body2"
                      onClick={() => handleDeleteItem(val.product.id)}
                    >
                      Remove
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    {formatPrice(val.quantity * val.product.salePrice)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ))}
    </Box>
  );
}

export default CartFeature;
