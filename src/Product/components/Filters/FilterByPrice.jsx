import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles(() => ({
  root: {
    padding: '16px',
    borderTop: '1px solid black',
  },

  range: {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0',
    '& > span': {
      margin: '0 8px',
    },
  },
}));

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [salePrice, setSalePrice] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setSalePrice((prevPrice) => ({
      ...prevPrice,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    if (!onChange) return;
    onChange(salePrice);

    //tìm kiếm xong xét giá trị về 0
    setSalePrice({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Chọn khoảng giá</Typography>

      <Box className={classes.range}>
        <TextField
          name="salePrice_gte"
          value={salePrice.salePrice_gte}
          variant="standard"
          onChange={handlePriceChange}
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          value={salePrice.salePrice_lte}
          variant="standard"
          onChange={handlePriceChange}
        />
      </Box>

      <Button variant="outlined" color="primary" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
