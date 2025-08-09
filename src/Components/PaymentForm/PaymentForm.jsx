import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.css'; 

const PaymentForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [input, setInput] = useState('');

  const [formData, setFormData] = useState({
      first_name:"",
      last_name:"",
      address:"",
      city:"",
      state:"",
      zipcode:"",
      phone_number:"",
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e) => {
  e.preventDefault();


  if (!stripe || !elements) return;

  try {
    const res = await fetch('https://snackaroo-backend.onrender.com/checkout', {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shippingDetails: formData }),
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
      window.location.href = "/"; 
    }
  } catch (error) {
    console.error("Payment error:", error);
    alert("Something went wrong during payment.");
  }
};

  return (
    <div className="payment-container">
      <h2>Shipping Details</h2>
      <div className="shipping-form">
        <input name="first_name" value={formData.first_name} onChange={changeHandler} placeholder="First Name" />
        <input name="last_name" value={formData.last_name} onChange={changeHandler} placeholder="Last Name" />
        <input name="address" value={formData.address} onChange={changeHandler} placeholder="Address" />
        <input name="city" value={formData.city} onChange={changeHandler} placeholder="City" />
        <input name="state" value={formData.state} onChange={changeHandler} placeholder="State" />
        <input name="zipcode" value={formData.zipcode} onChange={changeHandler} placeholder="Zip Code" />
        <input name="phone_number" value={formData.phone_number} onChange={changeHandler} placeholder="Phone Number" />
       </div>




      <form></form>
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <CardElement className="card-element" />
        <button type="submit" disabled={!stripe} className="pay-button">
          Pay ${totalAmount}
        </button>
        <button className="back-button" onClick={() => window.location.reload()}>
            Back to Cart
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;