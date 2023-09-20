import { Box, Typography } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
  return (
    <Box padding={1}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box fontSize={16} fontWeight="bold" component="span" mr={1}>
          {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
