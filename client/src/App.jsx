import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import './App.css'

import HomePage from "./scenes/homePage"
import ShoppingCart from "./scenes/shoppingCart/Index.jsx";
import Return from "./scenes/shoppingCart/Return.jsx";

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/shoppingCart' element={<ShoppingCart />} />
            <Route path='/shoppingCart/return' element={<Return />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
