import { useNavigate } from 'react-router-dom'; 

export default function Sidebar() {
  const navigate = useNavigate(); 

  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <div className="sidebar">
      <h2>Collections</h2>
      <ul>
        <li>
          <button onClick={() => handleNavigation('/users')}>Users</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/tickets')}>Tickets</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/reviews')}>Reviews</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/reservations')}>Reservations</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/payments')}>Payments</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/locations')}>Locations</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/flights')}>Flights</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/airports')}>Airports</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/airplanes')}>Airplanes</button>
        </li>
      </ul>
    </div>
  );
}
