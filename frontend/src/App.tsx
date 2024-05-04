import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './features/Users/Login.tsx';
import Register from './features/Users/Register.tsx';
import ProductForm from './features/Products/ProductForm.tsx';
import Products from './features/Products/Products.tsx';
import ProductData from './features/Products/ProductData.tsx';
import AppToolbar from './components/AppToolbar';

function App() {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add/product" element={<ProductForm />} />
        <Route path="/:id" element={<Products />} />
        <Route path="/product/:id" element={<ProductData />} />
      </Routes>
    </>
  )
}

export default App;