import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdatePaymentModal from './modals/UpdatePaymentList';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedPayment, setUpdatedPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/payments');
      setPayments(res.data);
    } catch (err) {
      console.error('Failed to fetch payments', err);
      alert('Failed to fetch payment data');
    }
  };

  const handleUpdate = async (paymentId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/payments/${paymentId}`);
      if (response.data) {
        setUpdatedPayment(response.data);
        setShowUpdateModal(true);
      } else {
        alert('Payment not found');
      }
    } catch (err) {
      console.error('Error fetching payment:', err);
      alert(`Failed to fetch payment data: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDelete = async (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await axios.delete(`http://localhost:5000/api/payments/${paymentId}`);
        alert('Payment deleted successfully');
        setPayments(payments.filter(payment => payment.PaymentID !== paymentId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete payment');
      }
    }
  };

  return (
    <div>
      <h1>Payments</h1>
      <table>
        <thead>
          <tr>
            <th>PaymentID</th>
            <th>Stripe Payment</th>
            <th>Payment Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Currency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.PaymentID}>
              <td>{payment.PaymentID}</td>
              <td>{payment.Stripe_Payment}</td>
              <td>{new Date(payment.Payment_date).toLocaleDateString()}</td>
              <td>{payment.Amount}</td>
              <td>{payment.Status}</td>
              <td>{payment.Payment_method}</td>
              <td>{payment.Currency}</td>
              <td>
                <button onClick={() => handleUpdate(payment.PaymentID)}>✏️</button>
                <button onClick={() => handleDelete(payment.PaymentID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && 
        <UpdatePaymentModal 
          payment={updatedPayment} 
          setShowUpdateModal={setShowUpdateModal} 
          fetchPayments={fetchPayments} 
        />
      }
    </div>
  );
};

export default PaymentList;