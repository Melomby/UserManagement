import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';  
import TicketList from './components/TicketList'; 
import ReviewList from './components/ReviewList';
import ReservationList from './components/ReservationList';
import PaymentList from './components/PaymentList';
import LocationList from './components/LocationList';
import FlightList from './components/FlightList';
import AirportList from './components/AirportList';
import AirplaneList from './components/AirplaneList';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/tickets" element={<TicketList />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/payments" element={<PaymentList />} />
            <Route path="/locations" element={<LocationList />} />
            <Route path="/flights" element={<FlightList />} />
            <Route path="/airports" element={<AirportList />} />
            <Route path="/airplanes" element={<AirplaneList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;