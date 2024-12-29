import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateReviewModal from './modals/UpdateReviewList';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedReview, setUpdatedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
      alert('Failed to fetch review data');
    }
  };

  const handleUpdate = async (reviewId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/${reviewId}`);
      if (response.data) {
        setUpdatedReview(response.data);
        setShowUpdateModal(true);
      } else {
        alert('Review not found');
      }
    } catch (err) {
      console.error('Error fetching review:', err);
      alert(`Failed to fetch review data: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`);
        alert('Review deleted successfully');
        setReviews(reviews.filter(review => review.ReviewID !== reviewId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete review');
      }
    }
  };

  return (
    <div>
      <h1>Reviews</h1>
      <table>
        <thead>
          <tr>
            <th>ReviewID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.ReviewID}>
              <td>{review.ReviewID}</td>
              <td>{review.Rating}</td>
              <td>{review.Comment}</td>
              <td>{new Date(review.Date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleUpdate(review.ReviewID)}>✏️</button>
                <button onClick={() => handleDelete(review.ReviewID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && 
        <UpdateReviewModal 
          review={updatedReview} 
          setShowUpdateModal={setShowUpdateModal} 
          fetchReviews={fetchReviews} 
        />
      }
    </div>
  );
};

export default ReviewList;