const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const port = 3000;

let flightData = [
  {
    flight_id: "6E 2341",
    airline: "Indigo",
    status: "On Time",
    departure_gate: "A12",
    arrival_gate: "B7",
    scheduled_departure: "2024-07-26T14:00:00Z",
    scheduled_arrival: "2024-07-26T18:00:00Z",
    actual_departure: null,
    actual_arrival: null
  },
  {
    flight_id: "6E 2342",
    airline: "Indigo",
    status: "Delayed",
    departure_gate: "C3",
    arrival_gate: "D4",
    scheduled_departure: "2024-07-26T16:00:00Z",
    scheduled_arrival: "2024-07-26T20:00:00Z",
    actual_departure: null,
    actual_arrival: null
  },
  {
    flight_id: "6E 2343",
    airline: "Indigo",
    status: "Cancelled",
    departure_gate: "E2",
    arrival_gate: "F1",
    scheduled_departure: "2024-07-26T12:00:00Z",
    scheduled_arrival: "2024-07-26T16:00:00Z",
    actual_departure: null,
    actual_arrival: null
  }
];

let notifications = [
  {
    notification_id: "1",
    flight_id: "6E 2341",
    message: "Your flight 6E 2341 is on time. Departure gate: A12.",
    timestamp: "2024-07-26T13:00:00Z",
    method: "SMS",
    recipient: "+1234567890"
  },
  {
    notification_id: "2",
    flight_id: "6E 2342",
    message: "Your flight 6E 2342 is delayed. New departure time: 2024-07-26T17:00:00Z. Departure gate: C3.",
    timestamp: "2024-07-26T15:30:00Z",
    method: "Email",
    recipient: "mrprajapatishubham2001@gmail.com"
  },
  {
    notification_id: "3",
    flight_id: "6E 2343",
    message: "Your flight 6E 2343 has been cancelled.",
    timestamp: "2024-07-26T11:00:00Z",
    method: "App",
    recipient: "user_app_id_12345"
  }
];

// Configure Nodemailer transport using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send email notification
const sendEmailNotification = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error: ${error}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

// Function to check and send notifications
const checkAndNotify = () => {
  flightData.forEach((flight) => {
    // Logic to check for changes in flight data
    // If changes detected, send notification

    // Example: Check for status change
    if (flight.status === 'Delayed' && flight.actual_departure === null) {
      // Find notification preference
      const notification = notifications.find(
        (n) => n.flight_id === flight.flight_id && n.method === 'Email'
      );

      if (notification) {
        sendEmailNotification(
          notification.recipient,
          'Flight Status Update',
          notification.message
        );
      }
    }
  });
};

// Endpoint to simulate data change (for testing)
app.post('/update-flight/:flight_id', (req, res) => {
  const { flight_id } = req.params;
  const { status, actual_departure, actual_arrival } = req.body;

  const flight = flightData.find((f) => f.flight_id === flight_id);
  if (flight) {
    flight.status = status || flight.status;
    flight.actual_departure = actual_departure || flight.actual_departure;
    flight.actual_arrival = actual_arrival || flight.actual_arrival;

    checkAndNotify();

    res.send('Flight data updated and notifications sent if applicable.');
  } else {
    res.status(404).send('Flight not found.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
