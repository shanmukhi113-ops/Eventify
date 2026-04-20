import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/authService";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        Eventify
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/discover" className="text-gray-600 hover:text-indigo-600">
          Discover
        </Link>
        {user ? (
          <>
            <Link to="/create" className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700">
              + Create Event
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}