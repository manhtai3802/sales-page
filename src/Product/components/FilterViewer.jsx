import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Chip } from '@mui/material';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: '8px',
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Miễn phí vận chuyển',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Khuyễn mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_gte') && Object.keys(filters).includes('salePrice_lte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (filters, nameCategory) => `${nameCategory}`,
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes('category.id'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: () => {},
  },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
  data: PropTypes.array,
};

function FilterViewer({ filters = {}, onChange = null, data }) {
  const nameCategory = data[0]?.category.name;
  const classes = useStyles();

  const handleVisible = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);
  return (
    <Box component="ul" className={classes.root}>
      {handleVisible.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters, nameCategory)}
            size="small"
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
