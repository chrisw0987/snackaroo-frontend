import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';
import { Link } from 'react-router-dom';

const Hero = () => {


  return (
    <div className="hero">
        <div className="hero-left">
            <h2>STONY BROOK CAMPUS EXCLUSIVE</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>Fresh</p>
                    <img src={hand_icon} alt=""></img>
                </div>
                <p>Snacks Delivered</p>
                <p>To Your Dorm!</p>
            </div>
            <Link style= {{textDecoration:'none'}} to='/crunchy'>
            <div className="hero-latest-btn">
                <div>SHOP NOW</div>
                <img src={arrow_icon} alt=""/>
            </div>
            </Link>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt=""></img>
        </div>
    </div>
  )
}

export default Hero;
