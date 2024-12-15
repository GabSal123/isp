import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "../styles/PaymentForm.css";

const stripePromise = loadStripe("pk_test_51QWJOCLSkfP3s4TWknsGKieV7U3K7eGccrEbZLGAnsQRdBL7nGEmtiFqN82Jgw73NBqFhbWsnncPt4AwxL4oTC5n00YXiysyeL");

const MokejimoInfo = () => {
  const [formData, setFormData] = useState({
    cardHolder: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const cart_id = localStorage.getItem("cartId");


      const { data } = await axios.post(`https://localhost:7241/CreatePaymentIntent?shoppingCartId=${cart_id}`, {
        shoppingCartId: cart_id,
      });

      const clientSecret = data.clientSecret;


      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.cardHolder,
          },
        },
      });

      if (paymentError) {
        setError(paymentError.message);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment succeeded!");
      }
    } catch (err) {
      setError("An error occurred while processing the payment.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form-container">
      <h1 className="payment-form-title">Mokejimas</h1>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="cardHolder">Moketojo vardas</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            placeholder="John Doe"
            value={formData.cardHolder}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="cardElement">Korteles informacija</label>
          <CardElement id="cardElement" />
        </div>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit" className="submit-button" disabled={isProcessing || !stripe || !elements}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

const MokejimoLangas = () => (
  <Elements stripe={stripePromise}>
    <MokejimoInfo />
  </Elements>
);

export default MokejimoLangas;
