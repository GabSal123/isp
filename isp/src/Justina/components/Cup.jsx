// Cup.jsx
import React from "react";
import '../styles/prekiuSarasas.css'; // Your cup styles
import ColaImage from "../assets/Cola.png";
import PepsiImage from "../assets/Pepsi.png";
import DefaultImage from "../assets/default.png";

const Cup = ({ product, onClick }) => {
    return (
      <div className="cup" onClick={onClick} style={{ cursor: 'pointer' }}>
        <div className="cup-image" style={{ backgroundImage: `url(${getImage(product.name)})` }}></div>
      </div>
    );
  };
const getImage = (productName) => {
    switch (productName) {
      case "Coca-Cola":
        return ColaImage; // Use the imported image
      case "Pepsi":
        return PepsiImage; // Use the imported image
      default:
        return DefaultImage; // Fallback image
    }
  };
export default Cup;
