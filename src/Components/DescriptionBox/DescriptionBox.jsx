import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (5)</div>
        </div>
        <div className="descriptionbox-description">
          <br/>
            <p>
              Crave that satisfying crunch? Our crunchy snacks deliver bold flavors and irresistible textures in every bite. 
              From crispy chips to airy crackers and seaweed bites, these munchies are perfect for snacking on the go, pairing with lunch, 
              or curbing those afternoon cravings. Light, addictive, and full of flavor — they’re the snap, crackle, pop your snack shelf deserves.
            </p>
            <br/>
            <p>
              Got a sweet tooth? We’ve got you covered. Our collection of sugary delights features melt-in-your-mouth 
              chocolates, chewy candies, creamy fillings, and adorable packaging to match. Whether you're looking to 
              treat yourself, gift a friend, or add fun to your snack drawer, these sweets are guaranteed to bring smiles — one bite at a time.
            </p>
            <br/>
            <p>
              Sip your way to happy. Our Asian drinks selection includes everything from refreshing teas 
              and fruity sodas to creamy milk beverages and chewy bubble teas. Perfectly chilled or 
              served over ice, these drinks are the ultimate thirst-quenchers for any vibe — sweet, fizzy, 
              smooth, or bold. Pop the cap, and enjoy the flavor adventure.
            </p>
        </div>
    </div>
  )
}
export default DescriptionBox
