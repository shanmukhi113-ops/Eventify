import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const CATEGORIES = ["Music", "Tech", "Sports", "Art", "Food", "Other"];

export default function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", date: "",
    location: "", category: "Other", imageUrl: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id = await createEvent(form, user.uid);
      toast.success("Event created!");
      navigate(`/event/${id}`);
    } catch (err) {
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white border rounded-2xl p-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Event Title</label>
          <input name="title" value={form.title} onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Give your event a great name" required />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange}
            rows={4} className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Tell people about your event" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Date & Time</label>
            <input type="datetime-local" name="date" value={form.date} onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
          <input name="location" value={form.location} onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Where is it happening?" required />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Image URL (optional)</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="https://..." />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50">
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}