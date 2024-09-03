import React from 'react';
import styled from 'styled-components';

const DetailsWrapper = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
  margin: 1rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const EventDetails = ({ event, onEdit, onDelete }) => {
  return (
    <DetailsWrapper>
      <h2>{event.title}</h2>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Category: {event.category}</p>
      <p>Description: {event.description}</p>
      <Button onClick={() => onEdit(event)}>Edit</Button>
      <Button onClick={() => onDelete(event.id)}>Delete</Button>
    </DetailsWrapper>
  );
};

export default EventDetails;
