import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateFlightModal from './modals/UpdateFlightList';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedFlight, setUpdatedFlight] = useState(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/flights');
      setFlights(res.data);
    } catch (err) {
      console.error('Failed to fetch flights', err);
      alert('Failed to fetch flight data');
    }
  };

  const handleUpdate = async (flightId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/flights/${flightId}`);
      if (response.data) {
        setUpdatedFlight(response.data);
        setShowUpdateModal(true);
      } else {
        alert('Flight not found');
      }
    } catch (err) {
      console.error('Error fetching flight:', err);
      alert(`Failed to fetch flight data: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDelete = async (flightId) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      try {
        await axios.delete(`http://localhost:5000/api/flights/${flightId}`);
        alert('Flight deleted successfully');
        setFlights(flights.filter(flight => flight.FlightID !== flightId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete flight');
      }
    }
  };

  return (
    <div>
      <h1>Flights</h1>
      <table>
        <thead>
          <tr>
            <th>FlightID</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.FlightID}>
              <td>{flight.FlightID}</td>
              <td>{new Date(flight.DepartureTime).toLocaleString()}</td>
              <td>{new Date(flight.ArrivalTime).toLocaleString()}</td>
              <td>{flight.Status}</td>
              <td>
                <button onClick={() => handleUpdate(flight.FlightID)}>✏️</button>
                <button onClick={() => handleDelete(flight.FlightID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && 
        <UpdateFlightModal 
          flight={updatedFlight} 
          setShowUpdateModal={setShowUpdateModal} 
          fetchFlights={fetchFlights} 
        />
      }
    </div>
  );
};

export default FlightList;
