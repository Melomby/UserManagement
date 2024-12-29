import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateAirplaneModal from './modals/UpdateAirplaneList';

const AirplaneList = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedAirplane, setUpdatedAirplane] = useState(null);

  useEffect(() => {
    fetchAirplanes();
  }, []);

  const fetchAirplanes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/airplanes');
      setAirplanes(res.data);
    } catch (err) {
      console.error('Failed to fetch airplanes', err);
      alert('Failed to fetch airplane data');
    }
  };

  const handleUpdate = async (airplaneId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/airplanes/${airplaneId}`);
      if (response.data) {
        setUpdatedAirplane(response.data);
        setShowUpdateModal(true);
      } else {
        alert('Airplane not found');
      }
    } catch (err) {
      console.error('Error fetching airplane:', err);
      alert(`Failed to fetch airplane data: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDelete = async (airplaneId) => {
    if (window.confirm("Are you sure you want to delete this airplane?")) {
      try {
        await axios.delete(`http://localhost:5000/api/airplanes/${airplaneId}`);
        alert('Airplane deleted successfully');
        setAirplanes(airplanes.filter(airplane => airplane.AirplaneID !== airplaneId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete airplane');
      }
    }
  };

  return (
    <div>
      <h1>Airplanes</h1>
      <table>
        <thead>
          <tr>
            <th>AirplaneID</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {airplanes.map(airplane => (
            <tr key={airplane.AirplaneID}>
              <td>{airplane.AirplaneID}</td>
              <td>{airplane.Name}</td>
              <td>{airplane.Capacity}</td>
              <td>
                <button onClick={() => handleUpdate(airplane.AirplaneID)}>✏️</button>
                <button onClick={() => handleDelete(airplane.AirplaneID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && 
        <UpdateAirplaneModal 
          airplane={updatedAirplane} 
          setShowUpdateModal={setShowUpdateModal} 
          fetchAirplanes={fetchAirplanes} 
        />
      }
    </div>
  );
};

export default AirplaneList;
