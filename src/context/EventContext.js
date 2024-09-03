import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const addEvent = (newEvent) => setEvents([...events, newEvent]);
    const editEvent = (updatedEvent) => {
        setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    };
    const deleteEvent = (id) => setEvents(events.filter(event => event.id !== id));

    return (
        <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};
