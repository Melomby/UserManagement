import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserModal = ({ user, setShowUpdateModal, fetchUsers }) => {
  const [updatedData, setUpdatedData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${updatedData.UserID}`, updatedData);
      alert('User updated successfully');
      setShowUpdateModal(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to update user');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="Name" value={updatedData.Name} onChange={handleInputChange} />
        <label>Passport No:</label>
        <input type="text" name="Passport_no" value={updatedData.Passport_no} onChange={handleInputChange} />
        <label>Gender:</label>
        <input type="text" name="Gender" value={updatedData.Gender} onChange={handleInputChange} />
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserModal;