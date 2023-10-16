import ProductFeature from 'Product';
import Header from 'layout/Header';
import { Route, Routes } from 'react-router-dom';
import CounterFeature from './components/Counter';
import CartFeature from 'components/Cart';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/counter" Component={CounterFeature}></Route>
        <Route path="/*" Component={ProductFeature}></Route>
        <Route path="/products/*" Component={ProductFeature}></Route>
        <Route path="/cart" Component={CartFeature}></Route>
      </Routes>
    </div>
  );
}

export default App;
