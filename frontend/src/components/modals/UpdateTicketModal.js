import React, { useState } from 'react';
import axios from 'axios';

const UpdateTicketModal = ({ ticket, setShowUpdateModal, fetchTickets }) => {
  const [updatedData, setUpdatedData] = useState(ticket);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tickets/${updatedData.TicketID}`, updatedData);
      alert('Ticket updated successfully');
      setShowUpdateModal(false);
      fetchTickets(); 
    } catch (err) {
      console.error(err);
      alert('Failed to update ticket');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Seat Number:</label>
        <input type="text" name="Seat_number" value={updatedData.Seat_number} onChange={handleInputChange} />
        <label>Status:</label>
        <select name="status" value={updatedData.status} onChange={handleInputChange}>
          <option value="reserved">Reserved</option>
          <option value="checked_in">Checked In</option>
          <option value="canceled">Canceled</option>
        </select>
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTicketModal;