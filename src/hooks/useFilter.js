import { useState, useMemo } from "react";

export function useFilter(events) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const filtered = useMemo(() => {
    let result = [...events];
    if (category !== "All")
      result = result.filter((e) => e.category === category);
    if (search)
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.location.toLowerCase().includes(search.toLowerCase())
      );
    result.sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "attendees") return b.attendeeCount - a.attendeeCount;
      return 0;
    });
    return result;
  }, [events, category, search, sortBy]);

  return { filtered, search, setSearch, category, setCategory, sortBy, setSortBy };
}