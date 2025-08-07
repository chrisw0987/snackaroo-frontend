import React, {useContext} from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { useState } from 'react';

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    if (!product) {
        return <p>Loading product details...</p>;
    }
    
  return (
    <div className="productdisplay">
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className="productdisplay-main-img" src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt=""/>
                <p>(5)</p>
            </div>
            <div className="product-display-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                A lightweight, individually packaged snack perfect for on-the-go enjoyment. Whether you're stocking up for study breaks, snack time, or road trips, 
                these treats combine convenience and flavor in every bite. They’re easy to carry, fun to eat, and ideal for kids, teens, and adults alike. With a 
                variety of unique flavors and playful packaging, our snacks bring joy and crunch to every moment—perfect for school lunches, movie nights, or mid-day pick-me-ups.
            </div>
            <div className="productdisplay-right-amount">
                <h1>Select Size</h1>
                <div className="productdisplay-right-amounts">
                    <div onClick={decreaseQuantity}>-</div>
                    <div>{quantity}</div>
                    <div onClick={increaseQuantity}>+</div>
                </div>
            </div>
            <button onClick={() => {addToCart(product.id, quantity)}}>ADD TO CART</button>
            <p className="productdisplay-right-category"><span>Category :</span>Yummy, Savory, Delicious</p>
            <p className="productdisplay-right-category"><span>Tags :</span>Snacks, Latest</p>

        </div>
    </div>
  )
}
export default ProductDisplay;