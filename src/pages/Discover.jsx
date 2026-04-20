import { useEffect } from "react";
import { useEvents } from "../hooks/useEvents";
import { useFilter } from "../hooks/useFilter";
import EventCard from "../components/EventCard";
import FilterBar from "../components/FilterBar";

export default function Discover() {
  const { events, loading, error, fetchEvents } = useEvents();
  const { filtered, search, setSearch, category, setCategory, sortBy, setSortBy } = useFilter(events);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Events</h1>
      <p className="text-gray-500 mb-6">Find what's happening near you</p>

      <FilterBar
        search={search} setSearch={setSearch}
        category={category} setCategory={setCategory}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-xl h-64 bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {error && <p className="text-red-500 mt-6">{error}</p>}

      {!loading && filtered.length === 0 && (
        <div className="text-center mt-16 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-medium">No events found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}