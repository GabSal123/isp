import React, { useState } from "react";
import '../styles/PrekiuSarasas.css'; // Ensure to import your CSS styles
import axios from "axios";

const CustomDropdown = ({ setFilteredProducts, products, fetchProductsByCategory, fetchRecommendedProducts }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Options for the dropdown
  const options = [
    { value: "", label: "Pasirinkite filtrą" }, // Resets to show all products
    { value: "Gėrimai", label: "Gėrimai" },
    { value: "Užkandžiai", label: "Užkandžiai" },
    { value: "Rekomenduojama", label: "Rekomenduojama" }, // Added recommended option
  ];

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionClick = async (option) => {
    console.log("Filtering started for:", option); // Debugging
    
    setSelectedOption(option);
    setIsOpen(false);

    if (option === "") {
      // Reset to show all products
      setFilteredProducts(products);
    } else if (option === "Rekomenduojama") {
      // Fetch recommended products when "Rekomenduojama" is selected
      fetchRecommendedProducts();
    } else {
      // Fetch filtered products by category (e.g., "Gėrimai", "Užkandžiai")
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
