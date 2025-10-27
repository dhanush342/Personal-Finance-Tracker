import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">💰 Finance Tracker</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="font-medium">Hi, {user.name.split(" ")[0]}</span>
          <button onClick={logout} className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 transition">Logout</button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-white hover:underline">Login</Link>
          <Link to="/register" className="text-white hover:underline">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
