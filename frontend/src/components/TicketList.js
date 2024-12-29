import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateTicketModal from './modals/UpdateTicketModal';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tickets');
      setTickets(res.data);
    } catch (err) {
      console.error('Failed to fetch tickets', err);
      alert('Failed to fetch ticket data');
    }
  };

  const handleUpdate = async (ticketId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tickets/${ticketId}`);
      if (response.data) {
        setUpdatedTicket(response.data);
        setShowUpdateModal(true);
      } else {
        alert('Ticket not found');
      }
    } catch (err) {
      console.error('Error fetching ticket:', err);
      alert(`Failed to fetch ticket data: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDelete = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);
        alert('Ticket deleted successfully');
        setTickets(tickets.filter(ticket => ticket.TicketID !== ticketId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete ticket');
      }
    }
  };

  return (
    <div>
      <h1>Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>TicketID</th>
            <th>Seat Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.TicketID}>
              <td>{ticket.TicketID}</td>
              <td>{ticket.Seat_number}</td>
              <td>{ticket.Status}</td>
              <td>
                <button onClick={() => handleUpdate(ticket.TicketID)}>✏️</button>
                <button onClick={() => handleDelete(ticket.TicketID)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && 
        <UpdateTicketModal 
          ticket={updatedTicket} 
          setShowUpdateModal={setShowUpdateModal} 
          fetchTickets={fetchTickets} 
        />
      }
    </div>
  );
};

export default TicketList;