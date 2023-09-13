import { useEffect } from 'react';
import productApi from './api/productApi';
import CounterFeature from './components/Counter';
import { Route, Routes } from 'react-router-dom';
import Header from 'layout/Header';

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
      <Routes>
        <Route path="/" Component={Header}></Route>
        <Route path="/counter" Component={CounterFeature}></Route>
      </Routes>
    </div>
  );
}

export default App;
