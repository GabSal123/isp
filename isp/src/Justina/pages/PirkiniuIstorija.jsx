import React, { useEffect, useState } from "react";
import axios from "axios";
import Bilietas from "../components/Bilietas.jsx"; // Assuming this is still your component
import ticketIcon from "../assets/bilietas.png"; // Example for image import (you can replace this if you need product images)
import seatIcon from "../assets/seat.png";  // Optional image for product or cart item
import Back from '../assets/back.png';  // Back button
import '../styles/PirkiniuIstorija.css';

const PirkiniuIstorija = () => {
  const [cartItems, setCartItems] = useState([]); // State to store cart data
  const [error, setError] = useState(null); // State for error handling

  const userId = 1; // You can dynamically fetch the userId as needed

  // Function to fetch cart data by user ID
  const fetchCartData = async () => {
    try {
      const response = await axios.get(`https://localhost:7241/GetCartsByUserId/${userId}`);
      setCartItems(response.data); // Assuming response.data contains cart items
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("Failed to fetch cart data");
    }
  };

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle back button click
  const handleBackClick = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="pirkiniu-body">
      <h1><center>Pirkinys</center></h1>

      {/* Check if there's an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Check if cartItems are available */}
      {cartItems.length === 0 ? (
  <p>No carts found for this user</p>
) : (
  cartItems.map((cartItem, index) => {
    console.log(cartItem);  // Check the data here in the console
    
    return (
      <Bilietas
        key={index}
        icon={ticketIcon}
        movieName={cartItem.productName}  // Make sure this matches the returned field
        seatIcon={seatIcon}
        price={cartItem.productPrice}  // Same here, make sure this is correct
      />
    );
  })
)}


      {/* Back Button */}
      <img 
        src={Back}
        alt="Back" 
        className="back-button" 
        onClick={handleBackClick} 
      />
    </div>
  );
};

export default PirkiniuIstorija;
