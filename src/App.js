import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import CalendarView from './pages/CalendarView';
import EventDetailsPage from './pages/EventDetailsPage';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
  return (
    <EventProvider>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<CalendarView />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
        </Routes>
      </Router>
    </EventProvider>
  );
};

export default App;
