import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentForm.css';

const MokejimoLangas = ()=> {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert('Payment Submitted Successfully!');
      };
    
      return (
        <div className="payment-form-container">
          <h1 className="payment-form-title">Mokejimas</h1>
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label htmlFor="cardNumber">Korteles numeris</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="19"
                required
              />
            </div>
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
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Galiojimo data</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  maxLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="3"
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-button">Pay Now</button>
          </form>
        </div>
      );
    



}

export default MokejimoLangas
