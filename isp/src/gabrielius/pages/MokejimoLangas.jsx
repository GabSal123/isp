import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "../styles/PaymentForm.css";

const stripePromise = loadStripe("pk_test_51QWJOCLSkfP3s4TWknsGKieV7U3K7eGccrEbZLGAnsQRdBL7nGEmtiFqN82Jgw73NBqFhbWsnncPt4AwxL4oTC5n00YXiysyeL");

const MokejimoInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardHolder: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const cart_id = localStorage.getItem("cartId");
  const userId = localStorage.getItem("id");

  useEffect(()=>{
    
    axios.get(`https://localhost:7241/GetPrice?shoppingCartId=${cart_id}`).then((res)=>{setAmount(res.data)})
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      setError("Stripe.js krauna...");
      return;
    }
  
    setIsProcessing(true);
    setError(null);
  
    try {
      const cart_id = localStorage.getItem("cartId");
  
      // Step 1: Create a PaymentIntent
      const { data } = await axios.post(`https://localhost:7241/CreatePaymentIntent?shoppingCartId=${cart_id}`, {
        shoppingCartId: cart_id,
      });
  
      const clientSecret = data.clientSecret;
  
      // Step 2: Confirm the payment with Stripe
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
        console.log( "mokejimas",paymentIntent);
        console.log( "mokejimas",formData);
        await axios.post(`https://localhost:7241/ChangeCartStats?shoppingCartId=${cart_id}&price=${amount}&holder=${formData.cardHolder}&digits=4848&userId=${userId}`);
        alert("Pavyko sumoketi!");
        const today = new Date();
        const creationDate = today.toISOString().split('T')[0];
        const creationTime = new Date().getHours();
        const cart = {
        creationDate: creationDate,
        creationTime: creationTime,
        state: 1,
        fkRegisteredUser: userId,
        };
        const new_cart_id = await axios.post("https://localhost:7241/CreateShoppingCart",cart).then((res)=>res.data)
        localStorage.setItem("cartId",new_cart_id)

  
        navigate("/")
      } else {
        setError("Nepavyko sumoketi!");
      }
    } catch (err) {
      setError("Ivyko klaida!");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  console.log(amount)
  return (
    <div className="payment-form-container">
            <button onClick={()=>navigate("/")}>Pagrindinis</button>
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
        <p>Kaina: {amount}</p>
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
