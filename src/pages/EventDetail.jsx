import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent, deleteEvent, toggleRSVP } from "../services/eventService";
import { useAuth } from "../hooks/useAuth";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function EventDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvent(id).then((data) => {
      setEvent(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>;
  if (!event) return <div className="p-8 text-center text-red-400">Event not found</div>;

  const isOwner = user?.uid === event.createdBy;
  const isAttending = user && event.attendees?.includes(user.uid);

  const handleRSVP = async () => {
    if (!user) return toast.error("Please log in to RSVP");
    await toggleRSVP(id, user.uid, isAttending);
    const updated = await getEvent(id);
    setEvent(updated);
    toast.success(isAttending ? "RSVP cancelled" : "You're going! 🎉");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this event?")) return;
    await deleteEvent(id);
    toast.success("Event deleted");
    navigate("/discover");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title}
          className="w-full h-64 object-cover rounded-2xl mb-6" />
      )}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
        <span className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full whitespace-nowrap">
          {event.category}
        </span>
      </div>
      <div className="mt-4 space-y-2 text-gray-600 text-sm">
        <p>📅 {format(new Date(event.date), "EEEE, MMMM d, yyyy · h:mm a")}</p>
        <p>📍 {event.location}</p>
        <p>👥 {event.attendeeCount || 0} people attending</p>
      </div>
      <p className="mt-6 text-gray-700 leading-relaxed">{event.description}</p>

      <div className="mt-8 flex gap-3">
        {!isOwner && (
          <button onClick={handleRSVP}
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
              isAttending
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}>
            {isAttending ? "Cancel RSVP" : "RSVP — I'm going!"}
          </button>
        )}
        {isOwner && (
          <>
            <button onClick={() => navigate(`/edit/${id}`)}
              className="px-6 py-2.5 rounded-xl border font-medium hover:bg-gray-50">
              Edit
            </button>
            <button onClick={handleDelete}
              className="px-6 py-2.5 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}