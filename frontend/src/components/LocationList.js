import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateLocationModal from './modals/UpdateLocationList';

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedLocation, setUpdatedLocation] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/locations');
      setLocations(res.data);
    } catch (err) {
      console.error('Failed to fetch locations', err);
      alert('Failed to fetch location data');
    }
  };

  const handleUpdate = async (locId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/locations/${locId}`);
      if (response.data) {
        setUpdatedLocation(response.data);
        setShowUpdateModal(true);
      } else {
        alert('Location not found');
      }
    } catch (err) {
      console.error('Error fetching location:', err);
      alert(`Failed to fetch location data: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDelete = async (locId) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      try {
        await axios.delete(`http://localhost:5000/api/locations/${locId}`);
        alert('Location deleted successfully');
        setLocations(locations.filter(location => location.locID !== locId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete location');
      }
    }
  };

  return (
    <div>
      <h1>Locations</h1>
      <table>
        <thead>
          <tr>
            <th>locID</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.locID}>
              <td>{location.locID}</td>
              <td>{location.City}</td>
              <td>{location.Country}</td>
              <td>
                <button onClick={() => handleUpdate(location.locID)}>✏️</button>
                <button onClick={() => handleDelete(location.locID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && 
        <UpdateLocationModal 
          location={updatedLocation} 
          setShowUpdateModal={setShowUpdateModal} 
          fetchLocations={fetchLocations} 
        />
      }
    </div>
  );
};

export default LocationList;
