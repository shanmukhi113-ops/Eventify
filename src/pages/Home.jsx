import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4">
      <span className="text-6xl mb-6">🎉</span>
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Discover what's happening<br />in your community
      </h1>
      <p className="text-xl text-gray-500 mb-8 max-w-xl">
        Find local events, connect with people nearby, and share your own experiences.
      </p>
      <div className="flex gap-4">
        <Link to="/discover"
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium text-lg hover:bg-indigo-700">
          Browse Events
        </Link>
        {!user && (
          <Link to="/register"
            className="border border-gray-200 px-8 py-3 rounded-xl font-medium text-lg hover:bg-gray-50">
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}