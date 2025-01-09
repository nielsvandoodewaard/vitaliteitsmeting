import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import SettingsPage from "./components/SettingsPage";
import Gebruikers from "./components/Gebruikers";
import Beheer from "./components/Beheer";
import UserSidebar from './components/UserSidebar';
import UserDashboard from './components/UserDashboard';
import UserSettings from './components/UserSettings';

function App() {
  const [successMessage, setSuccessMessage] = useState(""); // State voor de succesmelding

  // De onSave functie die we doorgeven aan de SettingsPage
  const handleSave = (settings) => {
    console.log("Saved settings:", settings);
    // Hier kun je de opgeslagen instellingen verwerken, zoals het opslaan in een backend

    // Melding tonen
    setSuccessMessage("Profielfoto & Naam opgeslagen!");

    // De melding na 3 seconden weer verbergen
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <Router>
      <Routes>
        {/* Redirect de gebruiker naar de loginpagina bij het opstarten */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Definieer andere routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/UserSidebar" element={<UserSidebar />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/settingspage" element={<SettingsPage onSave={handleSave} />} />
        <Route path="/gebruikers" element={<Gebruikers />} />
        <Route path="/beheer" element={<Beheer />} />
        <Route path="/usersettings" element={<UserSettings />} />
      </Routes>

      {/* Succesmelding tonen als die er is */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </Router>
  );
}

export default App;
