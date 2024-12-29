import React, { useState } from 'react';
import axios from 'axios';

const UpdateLocationModal = ({ location, setShowUpdateModal, fetchLocations }) => {
  const [updatedData, setUpdatedData] = useState(location);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/locations/${updatedData.locID}`, updatedData);
      alert('Location updated successfully');
      setShowUpdateModal(false);
      fetchLocations();
    } catch (err) {
      console.error(err);
      alert('Failed to update location');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>City:</label>
        <input type="text" name="city" value={updatedData.city} onChange={handleInputChange} />
        <label>Country:</label>
        <input type="text" name="country" value={updatedData.country} onChange={handleInputChange} />
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLocationModal;