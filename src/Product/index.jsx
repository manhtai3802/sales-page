import { Route, Routes } from 'react-router-dom';
import ListPages from './pages/ListPages';
import { Box } from '@mui/material';
function ProductFeature(props) {
  return (
    <Box pt={4}>
      <Routes>
        <Route path="/" element={<ListPages />}></Route>
      </Routes>
    </Box>
  );
}

export default ProductFeature;
