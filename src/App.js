import './App.css';
import {Navbar} from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import crunchy_banner from './Components/Assets/banner_crunchy.png';
import sweets_banner from './Components/Assets/banner_sweets.png';
import drinks_banner from './Components/Assets/banner_drinks.png';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/crunchy' element={<ShopCategory banner={crunchy_banner} category="crunchy"/>}/>
        <Route path='/sweets' element={<ShopCategory banner={sweets_banner} category="sweets"/>}/>
        <Route path='/drinks' element={<ShopCategory banner={drinks_banner} category="drinks"/>}/>
        <Route path="product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        {/* <Route path="/product/:productId" element={<Product />} /> */}
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
