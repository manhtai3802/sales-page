import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { formatPrice } from 'utils';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '16px',
  },

  shortDescription: {
    margin: '16px 0',
  },

  boxPrice: {
    padding: '16px 0',
    backgroundColor: '#f1eeee',
  },

  salePrice: {
    fontWeight: 'bold',
    fontSize: 'xx-large',
  },

  originalPrice: {
    textDecoration: 'line-through',
    padding: '16px',
  },

  promotionPercent: {},
}));

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, promotionPercent, originalPrice } = product;
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.shortDescription}>
        {shortDescription}
      </Typography>

      <Box className={classes.boxPrice}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>
              {` -${promotionPercent}%`}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
