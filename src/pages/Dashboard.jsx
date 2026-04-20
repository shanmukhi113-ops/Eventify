import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getUserEvents } from "../services/eventService";
import EventCard from "../components/EventCard";

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserEvents(user.uid).then((data) => {
        setMyEvents(data);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8">
        <p className="text-sm text-indigo-500">Signed in as</p>
        <h1 className="text-2xl font-bold text-gray-900">{profile?.displayName || user?.email}</h1>
        <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">My Events ({myEvents.length})</h2>
        <Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
          + New Event
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading your events...</p>
      ) : myEvents.length === 0 ? (
        <div className="text-center py-16 text-gray-400 border-2 border-dashed rounded-2xl">
          <p className="text-4xl mb-3">🎪</p>
          <p className="font-medium">You haven't created any events yet</p>
          <Link to="/create" className="text-indigo-600 text-sm mt-2 inline-block hover:underline">
            Create your first event →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      )}
    </div>
  );
}