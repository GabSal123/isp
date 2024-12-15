import React, { useState } from "react";
import '../styles/PrekiuSarasas.css'; // Ensure to import your CSS styles
import axios from "axios";

const CustomDropdown = ({ setFilteredProducts, products }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Options for the dropdown
  const options = [
    { value: "", label: "Pasirinkite filtrą" }, // Resets to show all products
    { value: "Gėrimai", label: "Gėrimai" },
    { value: "Užkandžiai", label: "Užkandžiai" },
    { value: "Rekomenduojama", label: "Rekomenduojama" },
  ];

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Fetch products by category from the API
  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(`https://localhost:7241/GetProductsByCategory?category=${category}`);
      if (response.data.length === 0) {
        setFilteredProducts([]); // Clear products if no products are found
      } else {
        setFilteredProducts(response.data); // Update filtered products with response data
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setFilteredProducts([]); // Clear products on error
    }
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    console.log("Filtering started for:", option); // Debugging
  
    setSelectedOption(option);
    setIsOpen(false);
  
    if (option === "") {
      // Reset to show all products
      setFilteredProducts(products);
    } else {
      // Fetch filtered products from the API
      fetchProductsByCategory(option);
    }
  };
  
  
  

  return (
    <div>
      <div className="dropdown">
        <div className="dropdown-display" onClick={toggleDropdown}>
          {selectedOption || "Pasirinkite filtrą"}
        </div>
        {isOpen && (
          <div className="dropdown-options">
            {options.map((option) => (
              <div
                key={option.value}
                className="dropdown-option"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
