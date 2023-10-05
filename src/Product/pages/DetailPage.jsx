import { Box, Container, Grid, LinearProgress, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddToCardForm from 'Product/components/AddToCardForm';
import ProductInfo from 'Product/components/ProductInfo';
import ProductMenu from 'Product/components/ProductMenu';
import ProductThumbnail from 'Product/components/ProductThumbnail';
import useProductDetail from 'Product/hooks/useProductDetail';
import { addToCart } from 'components/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '400px',
    padding: '12px',
    borderRight: `1px solid grey`,
  },

  right: {
    padding: '12px',
    flex: '1 1 0',
  },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailPage(props) {
  const { productId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, product } = useProductDetail(productId);
  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCard = ({ quantity }) => {
    const newArr = [];
    const getCartData = JSON.parse(localStorage?.getItem('cartData')) || [];
    const data = {
      id: product.id,
      product,
      quantity,
    };

    if (getCartData === null) {
      localStorage.setItem('cartData', JSON.stringify([data]));
    } else {
      newArr.push(...getCartData);
      const index = newArr.findIndex((x) => x.id === data.id);
      if (index >= 0) {
        const { id, product } = newArr[index];
        const newData = {
          id,
          product,
          quantity: (newArr[index].quantity += data.quantity),
        };

        const newArrUpdated = newArr.filter((val) => val.id !== newData.id);
        newArrUpdated.push(newData);
        localStorage.setItem('cartData', JSON.stringify(newArrUpdated));
        calculateCart(newArrUpdated);
      } else {
        newArr.push(data);
        localStorage.setItem('cartData', JSON.stringify(newArr));
        calculateCart(newArr);
      }
    }
    const action = addToCart(data);
    dispatch(action);
  };

  const calculateCart = (arrDataUpdated) => {
    const arrCountCart = arrDataUpdated.map((val) => val.quantity);
    const countTotalCart = arrCountCart.reduce((total, value) => {
      return total + value;
    }, 0);
    localStorage.setItem('countTotalCart', JSON.stringify(countTotalCart));
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCardForm onSubmit={handleAddToCard} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
      </Container>
    </Box>
  );
}

export default DetailPage;
