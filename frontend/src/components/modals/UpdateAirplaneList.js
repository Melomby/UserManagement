import React, { useState } from 'react';
import axios from 'axios';

const UpdateAirplaneModal = ({ airplane, setShowUpdateModal, fetchAirplanes }) => {
  const [updatedData, setUpdatedData] = useState(airplane);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/airplanes/${updatedData.AirplaneID}`, updatedData);
      alert('Airplane updated successfully');
      setShowUpdateModal(false);
      fetchAirplanes();  
    } catch (err) {
      console.error(err);
      alert('Failed to update airplane');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="Name" value={updatedData.Name} onChange={handleInputChange} />
        <label>Capacity:</label>
        <input type="number" name="Capacity" value={updatedData.Capacity} onChange={handleInputChange} />
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAirplaneModal;