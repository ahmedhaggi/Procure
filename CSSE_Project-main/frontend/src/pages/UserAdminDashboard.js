import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserAdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage (log out) and navigate to the login page
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h1>User Admin Dashboard</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default UserAdminDashboard;
