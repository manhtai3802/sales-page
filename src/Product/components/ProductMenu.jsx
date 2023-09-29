import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';

ProductMenu.propTypes = {};

const PageOne = () => <h2>PageOne</h2>;
const PageTwo = () => <h2>PageTwo</h2>;
const PageThree = () => <h2>PageThree</h2>;
const PageFour = () => <h2>PageFour</h2>;
function ProductMenu(props) {
  const { productId } = useParams();
  const pathname = `/products/${productId}`;
  const [value, setValue] = useState(`${pathname}/PageOne`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label="Tab navigation" value={value} variant="fullWidth" onChange={handleChange}>
          <Tab label="Tab One" component={Link} to={`${pathname}/PageOne`} value={`${pathname}/PageOne`} />
          <Tab label="Tab Two" component={Link} to={`${pathname}/pageTwo`} value={`${pathname}/pageTwo`} />
          <Tab label="Tab Three" component={Link} to={`${pathname}/pageThree`} value={`${pathname}/pageThree`} />
          <Tab label="Tab Four" component={Link} to={`${pathname}/pageFour`} value={`${pathname}/pageFour`} />
        </Tabs>
      </Box>
      <Routes>
        <Route index element={<Navigate to={`${pathname}/PageOne`} />} />
        <Route path={`/PageOne`} element={<PageOne />} />
        <Route path={`/pageTwo`} element={<PageTwo />} />
        <Route path={`/pageThree`} element={<PageThree />} />
        <Route path={`/pageFour`} element={<PageFour />} />
      </Routes>
    </Box>
  );
}

export default ProductMenu;
