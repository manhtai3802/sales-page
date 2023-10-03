import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import ProductAdditional from './ProductAdditional';
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import useProductDetail from 'Product/hooks/useProductDetail';

function ProductMenu(props) {
  const { productId } = useParams();
  const { product } = useProductDetail(productId);
  const pathnameReset = useLocation().pathname;
  const pathname = `/products/${productId}`;
  const [value, setValue] = useState(pathnameReset !== null ? pathnameReset : `${pathname}/description`);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          aria-label="Tab navigation"
          value={value === pathname ? `${pathname}/description` : value}
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab label="Description" component={Link} to={`${pathname}/description`} value={`${pathname}/description`} />
          <Tab label="Additional" component={Link} to={`${pathname}/additional`} value={`${pathname}/additional`} />
          <Tab label="Review" component={Link} to={`${pathname}/review`} value={`${pathname}/review`} />
        </Tabs>
      </Box>
      <Routes>
        <Route index element={<Navigate to={`${pathname}/description`} />} />
        <Route path={`/description`} element={<ProductDescription product={product} />} />
        <Route path={`/additional`} element={<ProductAdditional />} />
        <Route path={`/review`} element={<ProductReview />} />
      </Routes>
    </Box>
  );
}

export default ProductMenu;
