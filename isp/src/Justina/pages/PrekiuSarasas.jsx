import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Cart from "../assets/Cart.png";
import Dropdown from "../components/CustomDropdown.jsx"; // Ensure Dropdown is correctly imported
import Cup from "../components/Cup";
import '../styles/PrekiuSarasas.css';
import Back from '../assets/back.png'; // Back button image

const PrekiuSarasas = () => {
  const [products, setProducts] = useState([]); // State to store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
  const [error, setError] = useState(null); // State to store any error messages
  const navigate = useNavigate(); // React Router's navigate function

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7241/GetProducts'); // Ensure this URL is correct
      setProducts(response.data); // Set the products from the response data
      setFilteredProducts(response.data); // Initially, set filtered products to all products
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products'); // Set error message
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle product selection
  const handleProductClick = (productId) => {
    navigate(`/Preke/${productId}`); // Navigate to the product page
  };

  const handleCartClick = () => {
    navigate("/krepselis"); // Programmatically navigate to the cart page
  };

  return (
    <div>
      <div className="flex-container1">
        <Dropdown setFilteredProducts={setFilteredProducts} products={products} /> {/* Pass function to Dropdown */}
        <img src={Cart} alt="Cart" className="back-button" onClick={handleCartClick}/>
      </div>
      <div className="flex-container1">
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if any */}
        {filteredProducts.length === 0 ? (
          <p>Nėra prekių kategorijoje</p> // Show message if no products found
        ) : (
          filteredProducts.map((product) => (
            <Cup 
              key={product.id} 
              product={product} 
              onClick={() => handleProductClick(product.id)} // Navigate to product details
            />
          ))
        )}
      </div>
      <img 
        src={Back} 
        alt="Back" 
        className="back-button" 
        onClick={() => navigate(-1)} // Navigate back to the previous page
      />
    </div>
  );
};

export default PrekiuSarasas;
