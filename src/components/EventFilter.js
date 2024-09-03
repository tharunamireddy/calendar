import React from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const EventFilter = ({ filter, onFilterChange }) => {
  return (
    <FilterWrapper>
      <label>
        Filter by Category:
        <Select value={filter} onChange={e => onFilterChange(e.target.value)}>
          <option value="">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </Select>
      </label>
    </FilterWrapper>
  );
};

export default EventFilter;
