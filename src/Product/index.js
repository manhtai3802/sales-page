import { Route, Routes, useLocation } from 'react-router-dom';
import ListPages from './pages/ListPages';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useLocation();
  return (
    <div>
      Product Feature
      <Routes>
        <Route path="/products" Component={ListPages} />
      </Routes>
    </div>
  );
}

export default ProductFeature;
