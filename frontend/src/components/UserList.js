import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserModal from './modals/UpdateUserModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  } catch (err) {
    console.error('Failed to fetch users', err);
    alert('Failed to fetch user data');
  }
};

const handleUpdate = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
    if (response.data) {
      setUpdatedUser(response.data);
      setShowUpdateModal(true);
    } else {
      alert('User not found');
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    alert(`Failed to fetch user data: ${err.response ? err.response.data : err.message}`);
  }
};

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        alert('User deleted successfully');
        setUsers(users.filter(user => user.UserID !== userId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete user');
      }
    }
  };

  return (
    <div>
      <h1 className="UserNavigator">Users</h1>
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Name</th>
            <th>Passport No</th>
            <th>Gender</th>
            <th>Birth Date</th>
            <th>Hashed Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.UserID}>
              <td>{user.UserID}</td>
              <td>{user.Name}</td>
              <td>{user.Passport_no}</td>
              <td>{user.Gender}</td>
              <td>{new Date(user.BirthDate).toLocaleDateString()}</td>
              <td>{user.Hashed_password}</td>
              <td>
                <button className="pencil" onClick={() => handleUpdate(user.UserID)}>✏️</button>
                <button className="cross" onClick={() => handleDelete(user.UserID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && 
        <UpdateUserModal 
          user={updatedUser} 
          setShowUpdateModal={setShowUpdateModal} 
          fetchUsers={fetchUsers} 
        />
      }
    </div>
  );
};

export default UserList;