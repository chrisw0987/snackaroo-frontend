import React, { createContext, useEffect } from "react";
import { useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
        let cart = {};
        for (let index=0; index < 300+1; index++) {
            cart[index] = 0;
        }
        return cart;
    }

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('https://snackaroo-backend.onrender.com/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')) {
            fetch('https://snackaroo-backend.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:"",
            }).then((response)=>response.json()).then((data)=>setCartItems(data));
        }
    },[])

    const addToCart = async (itemId, quantity) => {
        setCartItems((prev)=>({...prev,[itemId]:(prev[itemId] || 0) + quantity}));
        if(localStorage.getItem('auth-token')) {
            await fetch('https://snackaroo-backend.onrender.com/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId, "quantity": quantity}),
            });
            const res = await fetch('https://snackaroo-backend.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body:""
            });
            const updatedCart = await res.json();
            setCartItems(updatedCart);
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]: Math.max((prev[itemId] || 0) -1,0)}));
        if (localStorage.getItem('auth-token')) {
            await fetch('https://snackaroo-backend.onrender.com/removecart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            });
            const res = await fetch('https://snackaroo-backend.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: ""
            });
            const updatedCart = await res.json();
            setCartItems(updatedCart);  
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const checkout = async () => {
        if (localStorage.getItem('auth-token')) {
            const res = await fetch('https://snackaroo-backend.onrender.com/checkout', {
                method: 'POST',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.success) {
                setCartItems(getDefaultCart());
                alert("Order placed successfully!");
            } else {
                alert("Checkout failed: " + data.errors);
            }
        }
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
        

    const contextValue = {getTotalCartItems, getTotalCartAmount,all_product,cartItems, addToCart, removeFromCart, checkout};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;