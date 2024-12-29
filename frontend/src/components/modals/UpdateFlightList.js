import React, { useState } from 'react';
import axios from 'axios';

const UpdateFlightModal = ({ flight, setShowUpdateModal, fetchFlights }) => {
  const [updatedData, setUpdatedData] = useState(flight);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/flights/${updatedData.FlightID}`, updatedData);
      alert('Flight updated successfully');
      setShowUpdateModal(false);
      fetchFlights(); 
    } catch (err) {
      console.error(err);
      alert('Failed to update flight');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Departure Time:</label>
        <input type="datetime-local" name="DepartureTime" value={updatedData.DepartureTime} onChange={handleInputChange} />
        <label>Arrival Time:</label>
        <input type="datetime-local" name="ArrivalTime" value={updatedData.ArrivalTime} onChange={handleInputChange} />
        <label>Status:</label>
        <select name="Status" value={updatedData.Status} onChange={handleInputChange}>
          <option value="scheduled">Scheduled</option>
          <option value="delayed">Delayed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFlightModal;