import React, { useState } from 'react';
import axios from 'axios';

const UpdateAirportModal = ({ airport, setShowUpdateModal, fetchAirports }) => {
  const [updatedData, setUpdatedData] = useState(airport);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/airports/${updatedData.AirportID}`, updatedData);
      alert('Airport updated successfully');
      setShowUpdateModal(false);
      fetchAirports(); 
    } catch (err) {
      console.error(err);
      alert('Failed to update airport');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="Name" value={updatedData.Name} onChange={handleInputChange} />
        <label>Code:</label>
        <input type="text" name="Code" value={updatedData.Code} onChange={handleInputChange} />
        <label>Location:</label>
        <input type="text" name="Location" value={updatedData.Location} onChange={handleInputChange} />
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAirportModal;