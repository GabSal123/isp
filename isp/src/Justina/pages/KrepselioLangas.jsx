import React, { useState, useEffect } from "react";
import axios from "axios";
import Bilietas from "../components/Bilietas.jsx";
import ticketIcon from "../assets/bilietas.png";
import seatIcon from "../assets/seat.png";
import Remove from "../assets/remove.png";
import Back from "../assets/back.png";
import Payment from "../assets/payment.png";
import History from "../assets/history.png";
import "../styles/PirkiniuIstorija.css";

const KrepselioLangas = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemToRemove, setItemToRemove] = useState(null); // New state to track item removal
    const cartId = localStorage.getItem("cartId");

    const handleBackClick = () => {
        window.history.back();
    };



    // useEffect to call the API when itemToRemove changes
    useEffect(() => {
        const handleRemove = async () => {
            if (itemToRemove) {
                try {
                    console.log("Removing item with ID:", itemToRemove);
                    const response = await axios.delete(`https://localhost:7241/RemoveCartItem/${cartId}/${itemToRemove}`);
                    console.log("API response:", response); // Log the full response object
                    if (response.status === 200) {
                        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemToRemove));
                    } else {
                        alert("Failed to remove the item.");
                    }
                } catch (err) {
                    console.error("Error removing item:", err);
                    alert("Failed to remove the item. Please try again.");
                } finally {
                    setItemToRemove(null); // Reset the state after the API call
                }
                window.location.reload();
            }
        };

        handleRemove();
    }, [itemToRemove, cartId]); // This effect depends on itemToRemove and cartId

    useEffect(() => {
      const fetchCartItems = async () => {
          try {
            const response = await axios.get(`https://localhost:7241/GetCartItems/${cartId}`); // API call to get product
            setCartItems(response.data); // Set product data
          } catch (err) {
              console.error("Error fetching cart items:", err);
              setError(err.response ? err.response.data : "Error fetching cart items.");
          } finally {
              setLoading(false);
          }
      };
  
      fetchCartItems();
  }, [cartId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="pirkiniu-body">
            <h1><center>Krepšelis</center></h1>
            {cartItems.map((item) => (
                <div className="flex-container" key={item.id}>
                    {Array.from({ length: item.quantity }).map((_, index) => (
                        <div className="ticket-row" key={`${item.id}-${index}`}>
                            <Bilietas
                                icon={ticketIcon}
                                movieName={item.productName}
                                seatIcon={seatIcon}
                                price={item.productPrice}
                            />
                            <img 
                                src={Remove}
                                alt="Remove" 
                                className="remove-button"
                                onClick={() => setItemToRemove(item.id)} // Update state to trigger item removal
                            />
                        </div>
                    ))}
                </div>
            ))}

            <div className="flex-container1">
                <img 
                    src={Back}
                    alt="Back" 
                    className="back-button" 
                    onClick={handleBackClick} 
                />
                <img 
                    src={Payment}
                    alt="payment" 
                    className="back-button" 
                />
                <img 
                    src={History}
                    alt="history" 
                    className="back-button" 
                />
            </div>
        </div>
    );
};

export default KrepselioLangas;
