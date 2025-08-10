import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import PaymentForm from '../PaymentForm/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(
  'pk_test_51Rs9RKIuZhT3hRVeW8SEeiR74akv0MeMRLh5y3FLvaNQIdzxo4KADLut3iUoNtctV22hpsMcN4jkIcxjxdLLAFP700hrUcTEYR'
);

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const loggedIn = !!localStorage.getItem('auth-token');

  useEffect(() => {
    if (showPayment && !loggedIn) {
      setShowPayment(false);
      navigate('/login', { replace: true });
    }
  }, [showPayment, loggedIn, navigate]);

  const itemsInCart = useMemo(() => {
    return all_product.filter((p) => (cartItems[p.id] || 0) > 0);
  }, [all_product, cartItems]);

  const total = getTotalCartAmount();

  if (showPayment && loggedIn) {
    return (
      <Elements stripe={stripePromise}>
        <PaymentForm totalAmount={total} />
      </Elements>
    );
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {itemsInCart.length === 0 && (
        <p style={{ padding: '1rem' }}>Your cart is empty.</p>
      )}

      {itemsInCart.map((e) => {
        const qty = cartItems[e.id] || 0;
        const line = Math.round((e.new_price || 0) * qty * 100) / 100;
        return (
          <div key={e.id}>
            <div className="cartitems-format cartitems-format-main">
              <img src={e.image} alt="" className="carticon-product-icon" />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className="cartitems-quantity">{qty}</button>
              <p>${line}</p>
              <img
                className="cartitems-remove-icon"
                src={remove_icon}
                onClick={() => removeFromCart(e.id)}
                alt=""
              />
            </div>
            <hr />
          </div>
        );
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${total}</h3>
            </div>
          </div>

          {loggedIn ? (
            <button onClick={() => setShowPayment(true)}>
              PROCEED TO CHECKOUT
            </button>
          ) : (
            <button onClick={() => navigate('/login')}>LOGIN TO CHECKOUT</button>
          )}
        </div>

        <div className="cartitems-promocode">
          <p>If You Have Promo Code, Enter Here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;