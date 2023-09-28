import { Box, Tab, Tabs } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';

ProductMenu.propTypes = {};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    listStyleType: 'none',
    justifyContent: 'space-evenly',
    padding: 0,

    '& > li': {
      padding: '16px 24px',
    },

    '& > li > a.active': {
      color: 'grey',
      textDecoration: 'underline',
    },
  },
}));

const PageOne = () => <h2>PageOne</h2>;
const PageTwo = () => <h2>PageTwo</h2>;
const PageThree = () => <h2>PageThree</h2>;
const PageFour = () => <h2>PageFour</h2>;
function ProductMenu(props) {
  const { productId } = useParams();
  const classes = useStyles();

  const pathname = `/products/${productId}`;
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label="Tab navigation" value={`${pathname}/PageOne`} variant="fullWidth">
          <Tab label="Tab One" component={Link} to={`${pathname}/`} value={`${pathname}/PageOne`} />
          <Tab label="Tab Two" component={Link} to={`${pathname}/pageTwo`} value={`${pathname}/pageTwo`} />
          <Tab label="Tab Three" component={Link} to={`${pathname}/pageThree`} value={`${pathname}/pageThree`} />
          <Tab label="Tab Four" component={Link} to={`${pathname}/pageFour`} value={`${pathname}/pageFour`} />
        </Tabs>
      </Box>
      <Routes>
        <Route index element={<Navigate to={`${pathname}/PageOne`} />} />
        <Route path={`${pathname}/PageOne`} element={<PageOne />} />
        <Route path={`${pathname}/pageTwo`} element={<PageTwo />} />
        <Route path={`${pathname}/pageThree`} element={<PageThree />} />
        <Route path={`${pathname}/pageFour`} element={<PageFour />} />
      </Routes>
    </Box>
  );
}

export default ProductMenu;
