import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventDetails from '../components/EventDetails';
import useEventManager from '../hooks/useEventManager';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent, editEvent } = useEventManager();
  const event = events.find((e) => e.id === parseInt(id));

  const handleDelete = (id) => {
    deleteEvent(id);
    navigate('/');
  };

  const handleEdit = (updatedEvent) => {
    editEvent(updatedEvent);
    navigate('/');
  };

  return (
    <EventDetails event={event} onDelete={handleDelete} onEdit={handleEdit} />
  );
};

export default EventDetailsPage;
