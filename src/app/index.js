import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import Product from "./product";
import {
  createBrowserRouter, Route,
  RouterProvider, Routes,
} from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main />}/>
        <Route path={'/articles/:id'} element={<Product />}/>
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
