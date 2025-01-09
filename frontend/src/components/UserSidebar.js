import React, { useState, useEffect } from "react";
import "../styles/UserSidebar.css"; // Importeer de CSS

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Laad de profielfoto uit localStorage bij het laden van de component
  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhoto");
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const photoDataUrl = reader.result;
        setProfilePhoto(photoDataUrl);
        localStorage.setItem("profilePhoto", photoDataUrl); // Bewaar de afbeelding in localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // Hier zou je de logica voor uitloggen kunnen toevoegen, bijvoorbeeld:
    // - Verwijderen van de session of token
    // - Redirect naar de loginpagina
    window.location.href = "/login"; // Verander dit naar je gewenste uitlog-pagina
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <div className="profile-section">
        <label htmlFor="photo-upload" className="photo-label">
          <img
            src={
              profilePhoto ||
              "https://via.placeholder.com/100?text=Upload+Photo"
            }
            alt="Profile"
            className={`profile-photo ${isCollapsed ? "collapsed-photo" : ""}`}
          />
        </label>
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: "none" }}
        />
        {!isCollapsed && <p className="profile-name">Niels van Doodewaard</p>}
      </div>
      <nav>
        <ul>
          <li>
            <a href="/UserDashboard" className="nav-link">
              <span className="icon">📊</span>
              <span className="text">Vragenlijst invullen</span>
            </a>
          </li>
          <li>
            <a href="/Contactgegevens" className="nav-link">
              <span className="icon">🔨</span>
              <span className="text">Contactgegevens</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="logout-section">
  <button className="logout-btn" onClick={handleLogout}>
    <span className="icon">🚪</span>
    {!isCollapsed && <span className="text">Uitloggen</span>} {/* De tekst alleen weergeven als de sidebar niet is ingeklapt */}
  </button>
</div>
    </div>
  );
};

export default Sidebar;
