import { Link } from "react-router-dom";
import { format } from "date-fns";

const CATEGORY_COLORS = {
  Music: "bg-pink-100 text-pink-700",
  Tech: "bg-blue-100 text-blue-700",
  Sports: "bg-green-100 text-green-700",
  Art: "bg-purple-100 text-purple-700",
  Food: "bg-orange-100 text-orange-700",
  Other: "bg-gray-100 text-gray-700",
};

export default function EventCard({ event }) {
  const { id, title, date, location, category, attendeeCount, imageUrl } = event;

  return (
    <Link to={`/event/${id}`} className="block group">
      <div className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
        <div className="h-40 bg-indigo-50 overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🎉</div>
          )}
        </div>
        <div className="p-4">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${CATEGORY_COLORS[category] || CATEGORY_COLORS.Other}`}>
            {category}
          </span>
          <h3 className="font-semibold text-gray-900 mt-2 line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            📅 {date ? format(new Date(date), "MMM d, yyyy · h:mm a") : "Date TBD"}
          </p>
          <p className="text-sm text-gray-500 truncate">📍 {location}</p>
          <p className="text-xs text-gray-400 mt-2">{attendeeCount || 0} attending</p>
        </div>
      </div>
    </Link>
  );
}