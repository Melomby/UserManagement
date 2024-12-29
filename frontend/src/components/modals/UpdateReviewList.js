import React, { useState } from 'react';
import axios from 'axios';

const UpdateReviewModal = ({ review, setShowUpdateModal, fetchReviews }) => {
  const [updatedData, setUpdatedData] = useState(review);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/reviews/${updatedData.ReviewID}`, updatedData);
      alert('Review updated successfully');
      setShowUpdateModal(false);
      fetchReviews(); 
    } catch (err) {
      console.error(err);
      alert('Failed to update review');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <select name="Rating" value={updatedData.Rating} onChange={handleInputChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label>Comment:</label>
        <textarea name="Comment" value={updatedData.Comment} onChange={handleInputChange}></textarea>
        <label>Date:</label>
        <input type="date" name="Date" value={updatedData.Date} onChange={handleInputChange} />
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReviewModal;