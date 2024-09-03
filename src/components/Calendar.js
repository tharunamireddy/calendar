import React from 'react';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  font-family: Arial, sans-serif;
`;

const DayCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: ${({ hasEvents }) => (hasEvents ? '#eaf7ff' : '#fff')};
  border: 1px solid #ddd;
  cursor: pointer;
  color: ${({ isHighlighted }) => (isHighlighted ? '#007bff' : '#333')};
  font-weight: ${({ isHighlighted }) => (isHighlighted ? 'bold' : 'normal')};
  position: relative;
`;

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #f1f1f1;
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
`;

const Calendar = ({ days, onDayClick, today, highlightedDate }) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <WeekHeader>
        {weekDays.map(day => <div key={day}>{day}</div>)}
      </WeekHeader>
      <CalendarWrapper>
        {days.map(({ date, eventCount }) => (
          <DayCell
            key={date ? date.toDateString() : 'empty'}
            hasEvents={eventCount > 0}
            isHighlighted={highlightedDate && date && date.toDateString() === highlightedDate.toDateString()}
            onClick={() => onDayClick(date ? date.getDate() : null)}
          >
            {date ? date.getDate() : ''}
          </DayCell>
        ))}
      </CalendarWrapper>
    </div>
  );
};

export default Calendar;
