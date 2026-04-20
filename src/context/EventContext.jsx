import { createContext, useState, useCallback } from "react";
import { getEvents } from "../services/eventService";

export const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async (category = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEvents(category);
      setEvents(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <EventContext.Provider value={{ events, loading, error, fetchEvents, setEvents }}>
      {children}
    </EventContext.Provider>
  );
}