import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import Product from './product';
import useSelector from '../store/use-selector';

function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
