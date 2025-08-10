import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

export const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems, clearCart } = useContext(ShopContext);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('auth-token'));

  useEffect(() => {
    const refresh = () => setLoggedIn(!!localStorage.getItem('auth-token'));
    window.addEventListener('auth-change', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('auth-change', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const dropdown_toggle = (e) => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }
  };

  const handleLogout = () => {
    clearCart();
    localStorage.removeItem('auth-token');                     
    setLoggedIn(false);
    window.dispatchEvent(new Event('auth-change'));
    navigate('/', { replace: true });
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SNACKAROO</p>
      </div>

      <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link style={{ textDecoration: 'none' }} to="/">Shop</Link>
          {menu === 'shop' && <hr />}
        </li>
        <li onClick={() => setMenu('crunchy')}>
          <Link style={{ textDecoration: 'none' }} to="/crunchy">Crunchy</Link>
          {menu === 'crunchy' && <hr />}
        </li>
        <li onClick={() => setMenu('sweets')}>
          <Link style={{ textDecoration: 'none' }} to="/sweets">Sweets</Link>
          {menu === 'sweets' && <hr />}
        </li>
        <li onClick={() => setMenu('drinks')}>
          <Link style={{ textDecoration: 'none' }} to="/drinks">Drinks</Link>
          {menu === 'drinks' && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {loggedIn ? (
          <button type="button" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login"><button type="button">Login</button></Link>
        )}
        <Link to="/cart"><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};