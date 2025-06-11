import './Offers.css';
import exclusive_image from '../Assets/exclusive_image.png';
import { Link } from 'react-router-dom';

const Offers = () => {
  return (
    <div className="offers">
        <div className="offers-left">
            <h1>Snack Deals Just For You</h1>
            <p>ONLY ON OUR BEST-LOVED SNACKS!</p>
            <Link style= {{textDecoration:'none'}} to='/sweets'> 
              <button>CHECK NOW</button>
            </Link>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt=""/>
        </div>
    </div>
  )
}
export default Offers