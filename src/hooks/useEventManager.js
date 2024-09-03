import { useContext } from 'react';
import { EventContext } from '../context/EventContext';

const useEventManager = () => {
    const { events, addEvent, editEvent, deleteEvent } = useContext(EventContext);
    return { events, addEvent, editEvent, deleteEvent };
};

export default useEventManager;
