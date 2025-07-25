import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GiftPage from './pages/GiftPage';
import RSVPPage from './pages/RSVPPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-wedding-light via-wedding-secondary to-wedding-light">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gifts" element={<GiftPage />} />
          <Route path="/rsvp" element={<RSVPPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
