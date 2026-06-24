// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("stellara_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not logged in
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("stellara_user");
    localStorage.removeItem("stellara_token"); // optional
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff1cc]">
      <div className="bg-[#d5c085] p-8 rounded shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4 text-yellow-900">Welcome, {user.name}!</h1>
        <p className="mb-4">Email: {user.email}</p>
        <button
          onClick={handleLogout}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
