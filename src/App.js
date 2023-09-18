import ProductFeature from 'Product';
import Header from 'layout/Header';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import productApi from './api/productApi';
import CounterFeature from './components/Counter';

function App() {
  useEffect(() => {
    const data = async () => {
      const params = {
        _limit: 20,
      };
      const productList = await productApi.getAll(params);
      console.log(productList);
    };

    data();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/counter" Component={CounterFeature}></Route>
        <Route path="/products/*" Component={ProductFeature}></Route>
      </Routes>
    </div>
  );
}

export default App;
