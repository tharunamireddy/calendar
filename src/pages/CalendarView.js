import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Heading = styled.h1`
text-align:center;
`;

const CalendarWrapper = styled.div`
  padding: 2rem;
  background: #f9f9f9;
  font-family: Arial, sans-serif;
  max-width: 900px;
  margin: auto;
  animation: ${fadeIn} 1s ease-in-out;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 0.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const DateHeader = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const EventItem = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }

  button {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background: #c82333;
    }
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const PopupContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${keyframes`
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  `} 0.3s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
`;

const Day = styled.div`
  padding: 10px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  margin: auto;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const HighlightedDate = styled.div`
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 10px;
`;

const EventForm = ({ selectedDate, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const eventData = {
        id: Date.now(),
        title,
        description,
        date: selectedDate,
      };
      onSubmit(eventData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Event on {selectedDate.toDateString()}</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
        />
      </div>
      <Button type="submit">Add Event</Button>
      <Button type="button" onClick={onCancel} style={{ marginLeft: '1rem' }}>
        Cancel
      </Button>
    </form>
  );
};

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
      setEvents(storedEvents);
    } catch (err) {
      setError('Error loading events from local storage.');
    }

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    setDays(getDaysInMonth(year, month));
  }, [currentMonth]);

  useEffect(() => {
    try {
      localStorage.setItem('events', JSON.stringify(events));
    } catch (err) {
      setError('Local storage limit exceeded. Some events may not be saved.');
    }
  }, [events]);

  const getDaysInMonth = (year, month) => {
    const daysInMonth = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysInMonth.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysInMonth.push(day);
    }

    return daysInMonth;
  };

  const getEventsForDay = (date) => {
    return events.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
  };

  const handleDayClick = (day) => {
    if (day) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      setSelectedDay(date);
      const eventsForDay = getEventsForDay(date);
      if (eventsForDay.length === 0) {
        setShowPopup(true); // Show Add Event popup
      } else {
        setShowPopup(false); // Show list of events
      }
    }
  };

  const handleFormSubmit = (eventData) => {
    try {
      setEvents((prevEvents) => [...prevEvents, eventData]);
      setShowPopup(false);
    } catch (err) {
      setError('Error saving event.');
    }
  };

  const handleFormCancel = () => {
    setShowPopup(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    setShowPopup(false);
  };

  const handleEventClick = (event) => {
    setSelectedDay(new Date(event.date));
    setShowPopup(true);
  };

  const daysWithEvents = days.map((day) => {
    if (day) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      return {
        date,
        events: getEventsForDay(date),
      };
    }
    return { date: null, events: [] };
  });

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <>    <Heading>Calendar</Heading>
    <CalendarWrapper>
      <Header>
        <Button onClick={handlePrevMonth}>Prev</Button>
        <DateHeader>
          {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </DateHeader>
        <Button onClick={handleNextMonth}>Next</Button>
      </Header>

      <Weekdays>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </Weekdays>

      <CalendarGrid>
        {daysWithEvents.map((dayInfo, index) => (
          <Day
            key={index}
            isToday={
              dayInfo.date &&
              dayInfo.date.toDateString() === new Date().toDateString()
            }
            onClick={() => handleDayClick(dayInfo.date?.getDate())}
          >
            {dayInfo.date && (
              dayInfo.date.toDateString() === new Date().toDateString() ? (
                <HighlightedDate>{dayInfo.date.getDate()}</HighlightedDate>
              ) : (
                dayInfo.date.getDate()
              )
            )}
          </Day>
        ))}
      </CalendarGrid>

      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <CloseButton onClick={handleFormCancel}>X</CloseButton>
            <EventForm
              selectedDate={selectedDay}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </PopupContent>
        </PopupOverlay>
      )}

      {selectedDay && !showPopup && (
        <div>
          <h2>Events on {selectedDay.toDateString()}</h2>
          <EventList>
            {getEventsForDay(selectedDay).map((event) => (
              <EventItem key={event.id} onClick={() => handleEventClick(event)}>
                <span>{event.title}</span>
                <button onClick={() => handleDeleteEvent(event.id)}>
                  Delete
                </button>
              </EventItem>
            ))}
          </EventList>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </CalendarWrapper>
    </>

  );
};

export default CalendarView;
