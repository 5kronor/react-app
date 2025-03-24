import React, { useState, useEffect, useRef } from 'react';
import './style.css';
// Import BoxIcons
import 'boxicons/css/boxicons.min.css';

// Import your images
import logo from './assets/logo.png';
import friesBox from './assets/frieslåda.png';
import steak from './assets/steak.png';
import foodora from './assets/foodora.jpg';
import classicBurger from './assets/classic.png';
import baconBurger from './assets/bacon.png';
import halloweenSpecial from './assets/halloween.png';
import wings from './assets/wings.png';
import food from './assets/food_back.jpg';
import burger from './assets/burger.jpg';
import grill from './assets/grill.jpg';

const HomePage = () => {
  // State for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State for button hover effects
  const [hoveredButton, setHoveredButton] = useState(null);
  
  // References for scrolling
  const yellowBoxRef = useRef(null);
  const menuRef = useRef(null);
  
  // New state for shopping cart
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  // State for notification
  const [notification, setNotification] = useState({ show: false, message: '' });
  
  // Back to top button functionality
  useEffect(() => {
    const handleScroll = () => {
      const goTopBtn = document.querySelector(".gotopbtn");
      if (goTopBtn) {
        if (window.scrollY > 150) {
          goTopBtn.classList.add("active");
        } else {
          goTopBtn.classList.remove("active");
        }
      }
      
      // Close sidebar on scroll
      if (window.scrollY > 50 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sidebarOpen]);

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle button hover
  const handleButtonHover = (button) => {
    setHoveredButton(button);
  };

  // Reset button hover
  const handleButtonLeave = () => {
    setHoveredButton(null);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to order section
  const scrollToYellowBox = () => {
    if (yellowBoxRef.current) {
      yellowBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to menu
  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // New function to add item to cart
  const addToCart = (name, price) => {
    const existingItem = cartItems.find(item => item.name === name);
    
    if (existingItem) {
      // Update quantity if item already exists
      const updatedItems = cartItems.map(item => 
        item.name === name ? {...item, quantity: item.quantity + 1} : item
      );
      setCartItems(updatedItems);
    } else {
      // Add new item
      setCartItems([...cartItems, { name, price, quantity: 1 }]);
    }
    
    // Update cart count
    setCartCount(prevCount => prevCount + 1);
    
    // Show notification
    setNotification({
      show: true,
      message: `Added ${name} to cart!`
    });
  };

  // Show cart details
  const showCartDetails = () => {
    if (cartCount === 0) {
      setNotification({
        show: true,
        message: 'Your cart is empty!'
      });
      return;
    }
    
    const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    
    setNotification({
      show: true,
      message: `Cart total: $${total.toFixed(2)}`
    });
  };

  // Menu item component with add to cart functionality
  const MenuItem = ({ name, description, price, image }) => {
    return (
      <div className="box">
        <div className="box-img">
          <img src={image} alt={name} />
        </div>
        <h2>{name}</h2>
        <h3>{description}</h3>
        <span>${price}</span>
        <button 
          className="add-to-cart-btn"
          onClick={() => addToCart(name, price)}
        >
          <i className='bx bx-cart'></i> Add to Cart
        </button>
      </div>
    );
  };

  return (
    <>
      {notification.show && (
        <div className="cart-notification show">
          <i className='bx bx-check-circle'></i>
          {notification.message}
        </div>
      )}
      
      <div className="cont_top">
        <div className="gotopbtn" onClick={scrollToTop}>
          <i className='bx bx-up-arrow-alt'></i>
        </div>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ top: sidebarOpen ? '0' : '-100%' }}>
        <ul>
          <li><a href="#"><i className='bx bx-home-alt'></i> Home</a></li>
          <li><a href="#"><i className='bx bx-cart-alt'></i> Order</a></li>
          <li><a href="#Meny"><i className='bx bx-fork'></i> Menu</a></li>
          <li><a href="#"><i className='bx bx-info-circle'></i> About</a></li>
        </ul>
      </div>

      <div className="hero">
        <nav>
          <a className="btn" onClick={toggleSidebar}>
            <i className={`bx ${sidebarOpen ? 'bx-x' : 'bx-menu'}`} 
               style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>
          </a>
          <a href="#" className="logo">
            <img src={logo} alt="Flaming Grill Logo" className="logo-img" />
            Flaming grill cafe
          </a>
          <div className="nav-buttons">
            {/* New cart icon with count */}
            <div className="cart-icon-container" onClick={showCartDetails}>
              <i className='bx bx-cart-alt'></i>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
            <button>Login</button>
          </div>
        </nav>

        <div className="content">
          <h2>Flame Grilling <br /> Since 1987!</h2>
          <p2>We strive of bringing you that unforgettable smoky flavor in every bite.<br /> 
            Savor the tradition, the heat, and the passion that make us the <br /> 
            go-to spot for burger lovers. Try us today, and taste the difference!</p2>
          <div>
            <button id="orderNowButton" onClick={scrollToYellowBox}>Order Now</button>
            <button className="know_more" id="knowMoreBtn">Know More</button>
            <button className="Crazy" id="crazy_button">CRAZY BUTTON</button>
          </div>
        </div>
      </div>

      <div className="screen">
        <div className="yellow-box" ref={yellowBoxRef}>
          <div className="DivBild1">
            <img src={friesBox} className="mat1" alt="Fries" />
          </div>
          <p3>Get it delivered!</p3>
          <div className="DivBild2">
            <img src={steak} className="mat2" alt="Steak" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="screen1">
          <div className="center-text1">
            <img src={foodora} className="img1" alt="Foodora" />
          </div>
        </div>
        <div className="screen2">
          <div className="text-container">
            <h3>Get our delicious food <br /> delivered to you!</h3>
            <div className="smalltextcont">
              <p4>Not only do we serve fresh beef in our restaurants <br /> 
                but we also serve it in your home or wherever you are. <br /> 
                So you can get a Tim's super® combo or another of your favorites.</p4>
            </div>
          </div>
          
          <div className="containerbuttons">
            <button 
              className="orderUber" 
              onMouseOver={() => handleButtonHover('uber')} 
              onMouseOut={handleButtonLeave}>
              ORDER WITH UBEREATS
            </button>
            <button 
              className="orderFoodora" 
              onMouseOver={() => handleButtonHover('foodora')} 
              onMouseOut={handleButtonLeave}>
              ORDER WITH FOODORA
            </button>
            <button 
              className="orderWolt" 
              onMouseOver={() => handleButtonHover('wolt')} 
              onMouseOut={handleButtonLeave}>
              ORDER WITH WOLT
            </button>
          </div>
        </div>
      </div>

      <section className="Meny" id="Meny" ref={menuRef}>
        <div className="heading">
          <span>FOOD MENU</span>
          <h2>Good Taste and Good Times</h2>
        </div>
        
        <div className="menu-container">
          <MenuItem 
            name="Flaming Chicken" 
            description="Real Tasty Real Fresh" 
            price="8.49" 
            image={classicBurger} 
          />
          
          <MenuItem 
            name="Flaming Bacon-Beast" 
            description="Real Tasty" 
            price="12.69" 
            image={baconBurger} 
          />
          
          <MenuItem 
            name="Seasonal Special" 
            description="Real Tasty" 
            price="13.00" 
            image={halloweenSpecial} 
          />
          
          <MenuItem 
            name="Piri-Piri Wings" 
            description="Real Tasty" 
            price="6.99" 
            image={wings} 
          />
          
          <MenuItem 
            name="Hot Wings" 
            description="Real Tasty" 
            price="6.99" 
            image={wings} 
          />
          
          <MenuItem 
            name="BBQ Wings" 
            description="Real Tasty" 
            price="6.99" 
            image={wings} 
          />
          
          <MenuItem 
            name="Honey Garlic Wings" 
            description="Real Tasty" 
            price="6.99" 
            image={wings} 
          />
          
          <MenuItem 
            name="Salt & Pepper Wings" 
            description="Real Tasty" 
            price="6.99" 
            image={wings} 
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;