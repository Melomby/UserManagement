import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateReservationModal from './modals/UpdateReservationList';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedReservation, setUpdatedReservation] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reservations');
      setReservations(res.data);
    } catch (err) {
      console.error('Failed to fetch reservations', err);
      alert('Failed to fetch reservation data');
    }
  };

  const handleUpdate = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reservations/${orderId}`);
      if (response.data) {
        setUpdatedReservation(response.data);
        setShowUpdateModal(true);
      } else {
        alert('Reservation not found');
      }
    } catch (err) {
      console.error('Error fetching reservation:', err);
      alert(`Failed to fetch reservation data: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await axios.delete(`http://localhost:5000/api/reservations/${orderId}`);
        alert('Reservation deleted successfully');
        setReservations(reservations.filter(reservation => reservation.OrderID !== orderId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete reservation');
      }
    }
  };

  return (
    <div>
      <h1>Reservations</h1>
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.OrderID}>
              <td>{reservation.OrderID}</td>
              <td>{new Date(reservation.Order_Date).toLocaleDateString()}</td>
              <td>{reservation.Total_Amount}</td>
              <td>
                <button onClick={() => handleUpdate(reservation.OrderID)}>✏️</button>
                <button onClick={() => handleDelete(reservation.OrderID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && 
        <UpdateReservationModal 
          reservation={updatedReservation} 
          setShowUpdateModal={setShowUpdateModal} 
          fetchReservations={fetchReservations} 
        />
      }
    </div>
  );
};

export default ReservationList;