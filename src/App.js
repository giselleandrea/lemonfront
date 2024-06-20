import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import Profile from './components/Profile';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:eventId" element={<EditEvent />} />
      </Routes>
    </Router>
  );
};

export default App;


