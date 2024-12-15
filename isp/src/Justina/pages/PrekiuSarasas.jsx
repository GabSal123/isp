import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Cart from "../assets/Cart.png";
import Dropdown from "../components/Dropdown.jsx";
import Cup from "../components/Cup";
import '../styles/PrekiuSarasas.css';

const PrekiuSarasas = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [error, setError] = useState(null); // State to store any error messages
  const navigate = useNavigate(); // React Router's navigate function

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7241/GetProducts'); // Ensure this URL is correct
      setProducts(response.data); // Set the products from the response data
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
    navigate("/Krepselis"); // Programmatically navigate to the cart page
  };
  return (
    <div>
      <div className="flex-container">
        <Dropdown />
        <img src={Cart} alt="Cart" className="back-button" onClick={handleCartClick}/>
      </div>
      <div className="flex-container">
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if any */}
        {products.map((product) => (
  <Cup 
    key={product.id} 
    product={product} 
    onClick={() => {
      console.log("Navigating to product ID:", product.id); // Debugging line
      navigate(`/Preke/${product.id}`);
    }} // Navigate to product details
  />
))}

      </div>
    </div>
  );
};

export default PrekiuSarasas;
