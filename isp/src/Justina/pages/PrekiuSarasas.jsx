import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cart from "../assets/Cart.png";
import Dropdown from "../components/CustomDropdown.jsx"; // Ensure CustomDropdown is imported
import Cup from "../components/Cup";
import '../styles/PrekiuSarasas.css';
import Back from '../assets/back.png';

const PrekiuSarasas = () => {
  const [products, setProducts] = useState([]); // State to store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
  const [error, setError] = useState(null); // State to store any error messages
  const [userId, setUserId] = useState(1); // Replace with actual user ID from session or context
  const navigate = useNavigate();

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7241/GetProducts');
      setProducts(response.data); // Set the products from the response data
      setFilteredProducts(response.data); // Initially, set filtered products to all products
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle product selection
  const handleProductClick = (productId) => {
    navigate(`/Preke/${productId}`);
  };

  const handleCartClick = () => {
    navigate("/krepselis");
  };

  // Function to fetch recommended products based on user ID
  const fetchRecommendedProducts = async () => {
    try {
      const response = await axios.get(`https://localhost:7241/RecommendProducts/${userId}`);
      if (response.data.length === 0) {
        setFilteredProducts([]); // Clear products if no recommended products
      } else {
        setFilteredProducts(response.data); // Update filtered products with recommendations
      }
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      setError('Failed to fetch recommended products');
    }
  };

  // Function to fetch products by category
  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(`https://localhost:7241/GetProductsByCategory?category=${category}`);
      if (response.data.length === 0) {
        setFilteredProducts([]); // Clear products if no products found for the category
      } else {
        setFilteredProducts(response.data); // Update filtered products with category data
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
      setFilteredProducts([]); // Clear products on error
    }
  };

  return (
    <div>
      <div className="flex-container1">
        <Dropdown 
          setFilteredProducts={setFilteredProducts} 
          products={products} 
          fetchProductsByCategory={fetchProductsByCategory} // Pass fetchProductsByCategory function
          fetchRecommendedProducts={fetchRecommendedProducts} // Pass fetchRecommendedProducts function
        />
        <img src={Cart} alt="Cart" className="back-button" onClick={handleCartClick} />
      </div>
      <div className="flex-container1">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {filteredProducts.length === 0 ? (
          <p>Nėra prekių kategorijoje</p>
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
        onClick={() => navigate(-1)} 
      />
    </div>
  );
};

export default PrekiuSarasas;
