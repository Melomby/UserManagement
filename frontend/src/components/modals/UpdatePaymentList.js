import React, { useState } from 'react';
import axios from 'axios';

const UpdatePaymentModal = ({ payment, setShowUpdateModal, fetchPayments }) => {
  const [updatedData, setUpdatedData] = useState(payment);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/payments/${updatedData.PaymentID}`, updatedData);
      alert('Payment updated successfully');
      setShowUpdateModal(false);
      fetchPayments();
    } catch (err) {
      console.error(err);
      alert('Failed to update payment');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Stripe Payment:</label>
        <input type="text" name="Stripe_Payment" value={updatedData.Stripe_Payment} onChange={handleInputChange} />
        <label>Payment Date:</label>
        <input type="date" name="Payment_date" value={updatedData.Payment_date} onChange={handleInputChange} />
        <label>Amount:</label>
        <input type="number" name="Amount" value={updatedData.Amount} onChange={handleInputChange} />
        <label>Status:</label>
        <select name="Status" value={updatedData.Status} onChange={handleInputChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <label>Payment Method:</label>
        <input type="text" name="Payment_Method" value={updatedData.Payment_Method} onChange={handleInputChange} />
        <label>Currency:</label>
        <input type="text" name="Currency" value={updatedData.Currency} onChange={handleInputChange} />
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePaymentModal;