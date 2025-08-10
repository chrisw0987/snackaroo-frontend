import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const BASE = 'https://snackaroo-backend.onrender.com';
const GUEST_CART_KEY = 'guest-cart';

const emptyCart = () => {
  const c = {};
  for (let i = 0; i <= 300; i++) c[i] = 0;
  return c;
};

const readGuestCart = () => {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return emptyCart();
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : emptyCart();
  } catch {
    return emptyCart();
  }
};

const writeGuestCart = (cart) => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  } catch {}
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(emptyCart());

  const isAuthed = () => !!localStorage.getItem('auth-token');

  useEffect(() => {
    const load = async () => {
      const prods = await fetch(`${BASE}/allproducts`).then((r) => r.json());
      setAll_Product(prods);

      if (isAuthed()) {
        const data = await fetch(`${BASE}/getcart`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': localStorage.getItem('auth-token') || '',
            'Content-Type': 'application/json',
          },
          body: '',
        }).then((r) => r.json());
        setCartItems(data || emptyCart());
      } else {
        setCartItems(readGuestCart());
      }
    };
    load();
  }, []);

  const syncServer = async () => {
    const res = await fetch(`${BASE}/getcart`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('auth-token') || '',
        'Content-Type': 'application/json',
      },
      body: '',
    });
    const updated = await res.json();
    setCartItems(updated || emptyCart());
  };

  const addToCart = async (itemId, quantity = 1) => {
    setCartItems((prev) => {
      const next = { ...prev, [itemId]: (prev[itemId] || 0) + quantity };
      if (!isAuthed()) writeGuestCart(next);
      return next;
    });

    if (isAuthed()) {
      await fetch(`${BASE}/addtocart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token') || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, quantity }),
      });
      await syncServer();
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const nextQty = Math.max((prev[itemId] || 0) - 1, 0);
      const next = { ...prev, [itemId]: nextQty };
      if (!isAuthed()) writeGuestCart(next);
      return next;
    });

    if (isAuthed()) {
      await fetch(`${BASE}/removecart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token') || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });
      await syncServer();
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      const qty = cartItems[item];
      if (!qty || qty <= 0) continue;
      const info = all_product.find((p) => p && Number(p.id) === Number(item));
      if (!info || typeof info.new_price !== 'number') continue;
      total += info.new_price * qty;
    }
    return total;
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      const qty = cartItems[item];
      if (qty && qty > 0) total += qty;
    }
    return total;
  };

  const checkout = async () => {
    if (!isAuthed()) return;
    const res = await fetch(`${BASE}/checkout`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('auth-token') || '',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data && data.success) {
      setCartItems(emptyCart());
      writeGuestCart(emptyCart());
      alert('Order placed successfully!');
    } else {
      alert('Checkout failed');
    }
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;