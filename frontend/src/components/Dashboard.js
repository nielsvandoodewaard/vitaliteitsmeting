import React from "react";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css"; // Importeer de CSS

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Here you can manage your application data and settings.</p>
      </div>
    </div>
  );
};

export default Dashboard;
