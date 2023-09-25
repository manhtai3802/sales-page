import { Box, Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductInfo from 'Product/components/ProductInfo';
import ProductThumbnail from 'Product/components/ProductThumbnail';
import useProductDetail from 'Product/hooks/useProductDetail';
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
}));

function DetailPage(props) {
  const { productId } = useParams();
  const classes = useStyles();

  const { loading, product } = useProductDetail(productId);
  if (loading) {
    return <Box>Loading</Box>;
  }

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
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
