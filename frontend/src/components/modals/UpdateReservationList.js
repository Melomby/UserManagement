import React, { useState } from 'react';
import axios from 'axios';

const UpdateReservationModal = ({ reservation, setShowUpdateModal, fetchReservations }) => {
  const [updatedData, setUpdatedData] = useState(reservation);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/reservations/${updatedData.OrderID}`, updatedData);
      alert('Reservation updated successfully');
      setShowUpdateModal(false);
      fetchReservations(); 
    } catch (err) {
      console.error(err);
      alert('Failed to update reservation');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Order Date:</label>
        <input type="date" name="OrderDate" value={updatedData.OrderDate} onChange={handleInputChange} />
        <label>Total Amount:</label>
        <input type="number" name="Total_Amount" value={updatedData.Total_Amount} onChange={handleInputChange} />
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReservationModal;