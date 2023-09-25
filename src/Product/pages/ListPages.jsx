import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FilterViewer from 'Product/components/FilterViewer';
import ProductFilter from 'Product/components/ProductFilter';
import ProductList from 'Product/components/ProductList';
import ProductSkeletonList from 'Product/components/ProductSkeletonList';
import ProductSort from 'Product/components/ProductSort';
import productApi from 'api/productApi';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '10px',
  },
}));

function ListPages(props) {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  const navigateFilters = (filters) => {
    return navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Fail', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    navigateFilters(filters);
    setLoading(true);
  };

  const handleSortChange = (sort) => {
    const filters = {
      ...queryParams,
      _sort: sort,
    };
    navigateFilters(filters);
    setLoading(true);
  };

  const handleFilterChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    navigateFilters(filters);
    setLoading(true);
  };

  const setNewFilters = (newFilters) => {
    navigateFilters(newFilters);
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilter filters={queryParams} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} data={productList} />

              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPages;
