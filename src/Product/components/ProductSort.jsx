import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onchange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs value={currentSort} onChange={handleSortChange} variant="fullWidth">
      <Tab label="Sắp xếp thấp đến cao" value="salePrice:ASC" />
      <Tab label="Sắp xếp cao đến thấp" value="salePrice:DESC" />
    </Tabs>
  );
}

export default ProductSort;
