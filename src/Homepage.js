import React, { useState, useRef } from "react";
import "./style.css";

const Homepage = () => {
  // Background change state
  const [currentBackground, setCurrentBackground] = useState(0);
  const backgrounds = [
    "url('burger.jpg')",
    "url('grill.jpg')",
    "url('food_back.jpg')"
  ];

  // Section navigation refs
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  const handleNavClick = (event, targetRef) => {
    event.preventDefault();

    // Hide all sections
    [section1Ref, section2Ref].forEach((ref) => {
      if (ref.current) ref.current.style.display = "none";
    });

    // Show target section
    if (targetRef.current) {
      targetRef.current.style.display = "block";
    }
  };

  // Scroll to yellow box
  const yellowBoxRef = useRef(null);
  const handleOrderClick = () => {
    alert("Hello JavaScript!");
    if (yellowBoxRef.current) {
      yellowBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Background change handler
  const handleBackgroundChange = () => {
    setCurrentBackground((prevBackground) => (prevBackground + 1) % backgrounds.length);
  };

  // Hover effects for buttons
  const handleHover = (event, hover) => {
    event.target.style.backgroundColor = hover ? "#e78f38" : "#17A5F5";
    event.target.style.transform = hover ? "scale(1.05)" : "scale(1)";
  };

  // Hover effects for boxes
  const handleBoxHover = (event, hover) => {
    event.target.style.transition = "0.1s linear";
    event.target.style.transform = hover ? "translateY(-15px)" : "translateY(0)";
    event.target.style.boxShadow = hover ? "0 4px 8px rgb(0, 0, 0)" : "0 4px 8px rgba(0, 0, 0, 0.1)";
    event.target.style.borderColor = hover ? "red" : "#000000fd";
    event.target.style.backgroundColor = hover ? "#fff3e0" : "#ffffff";
  };

  // Smooth scroll to menu container
  const menuContainerRef = useRef(null);
  const handleMenuScroll = () => {
    if (menuContainerRef.current) {
      menuContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Navigation */}
      <nav>
        <ul>
          <li><a href="#section1" onClick={(e) => handleNavClick(e, section1Ref)}>Section 1</a></li>
          <li><a href="#section2" onClick={(e) => handleNavClick(e, section2Ref)}>Section 2</a></li>
        </ul>
      </nav>

      {/* Order Now Button */}
      <button
        id="orderNowButton"
        onClick={handleOrderClick}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        Order Now
      </button>

      {/* Hero Section with Changing Background */}
      <div
        className="hero"
        style={{ backgroundImage: backgrounds[currentBackground] }}
      >
        Hero Section
      </div>

      {/* Change Background Button */}
      <button className="know_more" onClick={handleBackgroundChange}>
        Know More
      </button>

      {/* Sections */}
      <div ref={yellowBoxRef} className="yellow-box"></div>
      <div ref={section1Ref} className="screen">Section 1 Content</div>
      <div ref={section2Ref} className="screen" style={{ display: "none" }}>Section 2 Content</div>

      {/* Menu Container Scroll */}
      <button className="orderUber" onClick={handleMenuScroll}>Order Uber</button>
      <div ref={menuContainerRef} className="menu-container"></div>

      {/* Hover Effect Boxes */}
      <div className="box-container">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="box"
            onMouseEnter={(e) => handleBoxHover(e, true)}
            onMouseLeave={(e) => handleBoxHover(e, false)}
          >
            Box {num}
          </div>
        ))}
      </div>
    </div>
  );
};




const changeBackground = () => {
    setCurrentBackground((prevBackground) => (prevBackground + 1) % backgrounds.length);
  };
  
  // Then in your JSX:
  <button className="know_more" id="knowMoreBtn" onClick={changeBackground}>Know More</button>
export default Homepage;
