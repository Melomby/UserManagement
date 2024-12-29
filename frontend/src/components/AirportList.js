import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateAirportModal from './modals/UpdateAirportList';

const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedAirport, setUpdatedAirport] = useState(null);

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/airports');
      setAirports(res.data);
    } catch (err) {
      console.error('Failed to fetch airports', err);
      alert('Failed to fetch airport data');
    }
  };

  const handleUpdate = async (airportId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/airports/${airportId}`);
      if (response.data) {
        setUpdatedAirport(response.data);
        setShowUpdateModal(true);
      } else {
        alert('Airport not found');
      }
    } catch (err) {
      console.error('Error fetching airport:', err);
      alert(`Failed to fetch airport data: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDelete = async (airportId) => {
    if (window.confirm("Are you sure you want to delete this airport?")) {
      try {
        await axios.delete(`http://localhost:5000/api/airports/${airportId}`);
        alert('Airport deleted successfully');
        setAirports(airports.filter(airport => airport.AirportID !== airportId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete airport');
      }
    }
  };

  return (
    <div>
      <h1>Airports</h1>
      <table>
        <thead>
          <tr>
            <th>AirportID</th>
            <th>Name</th>
            <th>IATA Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {airports.map(airport => (
            <tr key={airport.AirportID}>
              <td>{airport.AirportID}</td>
              <td>{airport.Name}</td>
              <td>{airport.IATA_Code}</td>
              <td>
                <button onClick={() => handleUpdate(airport.AirportID)}>✏️</button>
                <button onClick={() => handleDelete(airport.AirportID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && 
        <UpdateAirportModal 
          airport={updatedAirport} 
          setShowUpdateModal={setShowUpdateModal} 
          fetchAirports={fetchAirports} 
        />
      }
    </div>
  );
};

export default AirportList;