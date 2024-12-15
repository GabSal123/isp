import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import Counter from "../components/Counter.jsx"; // Import the counter component
import Back from '../assets/back.png'; // Back button image
import Add from '../assets/add.png'; // Add button image
import '../styles/PrekesLangas.css'; // Import your CSS styles
import ColaImage from "../assets/Cola.png";
import PepsiImage from "../assets/Pepsi.png";
import FantaImage from "../assets/Fanta.png";
import SpriteImage from "../assets/Sprite.png";
import PopcornImage from "../assets/Popcorn.png";
import DefaultImage from "../assets/default.png";
import axios from "axios"; // Import axios for API calls

const PrekesLangas = () => {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate(); // To navigate back to the previous page
  const [product, setProduct] = useState(null); // State to store product details
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch product details based on productId
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7241/GetProduct/${id}`); // API call to get product
        setProduct(response.data); // Set product data
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [id]); // Fetch when product ID changes

  // Handle adding the product to the cart
  const handleAddClick = async () => {
    try {

      const Amount = quantity;
      const FkShoppingCart = localStorage.getItem("cartId"); // Get the current cart ID (you might need to get it dynamically)
      const FkProduct = parseInt(product.id, 10);  // Use the product ID
      console.log(quantity);

  
      const response = await axios.post("https://localhost:7241/AddIncludedProduct", {
        FkProduct,
        FkShoppingCart,
        Amount
      });
  
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
    navigate(-1)
  };

  // If there is an error, display it
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  // Show loading while product data is fetching
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="prekes-body">
      <img 
        src={getImage(product.name)} // Get the image based on product name
        alt={product.name} 
        className="product-image" 
      />
      <h2>{product.name}</h2> {/* Display product name */}

      <div className="flex-container1">
        <img 
          src={Back} 
          alt="Back" 
          className="back-button" 
          onClick={() => navigate(-1)} // Navigate back to the previous page
        />

        <div className="counter">
          {/* Pass necessary props to Counter */}
          <Counter 
            amountLeft={product.availableQuantity} 
            quantity={quantity} 
            setQuantity={setQuantity} // Pass the setter to Counter
          />
        </div>

        <img 
          src={Add} // Ensure this path is correct for your add image
          alt="Add" 
          className="add-button" 
          onClick={handleAddClick} 
        />
      </div>
    </div>
  );
};

// Function to get product image based on name
const getImage = (productName) => {
    switch (productName) {
      case "Coca-Cola":
        return ColaImage; // Use the imported image
      case "Pepsi":
        return PepsiImage; // Use the imported image
        case "Fanta":
          return FantaImage; // Use the imported image
          case "Sprite":
            return SpriteImage; // Use the imported image
            case "Popcorn":
              return PopcornImage; // Use the imported image
      default:
        return DefaultImage; // Fallback image
    }
  };

export default PrekesLangas;
