import React, { useState, useEffect } from 'react';
import './App.css';
import { flightdata } from './flightdata.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [data, setData] = useState([]);
  const [flight_id, setFlightId] = useState('');
  const [airline, setAirline] = useState('');
  const [status, setStatus] = useState('');
  const [departure_gate, setDepartureGate] = useState('');
  const [arrival_gate, setArrivalGate] = useState('');
  const [scheduled_departure, setScheduledDeparture] = useState('');
  const [scheduled_arrival, setScheduledArrival] = useState('');
  const [actual_departure, setActualDeparture] = useState('');
  const [actual_arrival, setActualArrival] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [showTable, setShowTable] = useState(false); // Add this state variable

  useEffect(() => {
    console.log("flightdata", flightdata)
    setData(flightdata)
    console.log("Data", data)
  }, []);

  const handleSearch = () => {
    console.log('flightdata:', flightdata);
    console.log('flight_id:', flight_id);
    const searchResult = flightdata.find(flight => flight.flight_id === flight_id);
    if (searchResult) {
      setStatus(searchResult.status);
      setAirline(searchResult.airline);
      setDepartureGate(searchResult.departure_gate);
      setArrivalGate(searchResult.arrival_gate);
      setScheduledDeparture(searchResult.scheduled_departure);
      setScheduledArrival(searchResult.scheduled_arrival);
      setActualDeparture(searchResult.actual_departure);
      setActualArrival(searchResult.actual_arrival);
      setNotFound(false);
      setShowTable(true); // Set showTable to true when search is successful
    } else {
      setNotFound(true);
      setAirline('');
      setStatus('');
      setDepartureGate('');
      setArrivalGate('');
      setScheduledDeparture('');
      setScheduledArrival('');
      setActualDeparture('');
      setActualArrival('');
      setShowTable(false); // Set showTable to false when search is not successful
    }
  }

  const handleReset = () => {
    setFlightId('');
    setAirline('');
    setStatus('');
    setDepartureGate('');
    setArrivalGate('');
    setScheduledDeparture('');
    setScheduledArrival('');
    setActualDeparture('');
    setActualArrival('');
    setNotFound(false);
    setShowTable(false); // Set showTable to false when reset is clicked
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-primary">
        <a className="navbar-brand" href="#">Indigo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Explore <span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Book</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Help</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Login</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <h1>Flight Search</h1>
        <div className="search-form">
          <input type="text" value={flight_id} onChange={(e) => setFlightId(e.target.value)} placeholder="Enter Flight ID" />
          <br></br>
          <br></br>
          
          <button style={{ marginRight: '10px' }} onClick={handleSearch}>Search</button>
          <button onClick={handleReset}>Reset</button>
        </div>

        {showTable && ( // Conditionally render the table based on showTable state
          <div className="flight-info container">
            <h3>Flight Information</h3>
            {notFound? (
              <p>Flight not found. Please check the flight ID and try again.</p>
            ) : (
              <div className="table-container">
                <table className="centered-table">
                  <tbody>
                  <tr>
                      <th className="table-header">Airline:</th>
                      <td className="table-data">{airline}</td>
                    </tr>
                    <tr>
                      <th className="table-header">Status:</th>
                      <td className="table-data">{status}</td>
                    </tr>
                    <tr>
                      <th className="table-header">Departure Gate:</th>
                      <td className="table-data">{departure_gate}</td>
                    </tr>
                    <tr>
                      <th className="table-header">Arrival Gate:</th>
                      <td className="table-data">{arrival_gate}</td>
                    </tr>
                    <tr>
                      <th className="table-header">Scheduled Departure:</th>
                      <td className="table-data">{scheduled_departure}</td>
                    </tr>
                    <tr>
                      <th className="table-header">Scheduled Arrival:</th>
                      <td className="table-data">{scheduled_arrival}</td>
                    </tr>
                    <tr>
                      <th className="table-header">Actual Departure:</th>
                      <td className="table-data">{actual_departure}</td>
                    </tr>
                    <tr>
                      <th className="table-header">Actual Arrival:</th>
                      <td className="table-data">{actual_arrival}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;