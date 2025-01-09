import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";
import "../styles/Gebruikers.css"; // Voeg je aangepaste CSS toe

const UsersManagement = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    voornaam: "",
    achternaam: "",
    gemeente: "",
    andereGemeente: "",
    praktijknaam: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [editUsername, setEditUsername] = useState("");
  const [userToEdit, setUserToEdit] = useState(null);
  const [usersList, setUsersList] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:1337/api/registrations/${editUsername}`);
      setUserToEdit(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage("Gebruiker niet gevonden.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.gemeente || !formData.praktijknaam) {
      setErrorMessage("Vul alle velden in.");
      return;
    }

    const gemeenteToSend = formData.gemeente === "Anders" ? formData.andereGemeente : formData.gemeente;

    try {
      const response = await axios.post(
        "http://localhost:1337/api/registrations",  // Zorg ervoor dat de juiste endpoint URL gebruikt wordt
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          voornaam: formData.voornaam,
          achternaam: formData.achternaam,
          gemeente: gemeenteToSend,
          praktijknaam: formData.praktijknaam,
        }
      );
      alert("Gebruiker toegevoegd!");
      setFormData({
        username: "",
        email: "",
        password: "",
        voornaam: "",
        achternaam: "",
        gemeente: "",
        andereGemeente: "",
        praktijknaam: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage("Er is een fout opgetreden bij het toevoegen van de gebruiker.");
    }
  };

  const fetchUsersList = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/registrations");
      setUsersList(response.data);
    } catch (error) {
      console.error("Fout bij het ophalen van gebruikers:", error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (!userToEdit.voornaam || !userToEdit.achternaam || !userToEdit.praktijknaam) {
      setErrorMessage("Vul alle velden in.");
      return;
    }

    try {
      // Verzend de geüpdatete gegevens naar de API
      const response = await axios.put(
        `http://localhost:1337/api/registrations/${userToEdit.username}`,  // Zorg ervoor dat de juiste API URL gebruikt wordt
        {
          voornaam: userToEdit.voornaam,
          achternaam: userToEdit.achternaam,
          praktijknaam: userToEdit.praktijknaam,
        }
      );
      alert("Gebruiker bijgewerkt!");
      setIsModalOpen(false); // Sluit de modal
      setErrorMessage('');  // Reset de foutmelding
    } catch (error) {
      setErrorMessage("Er is een fout opgetreden bij het bijwerken van de gebruiker.");
    }
  };

  useEffect(() => {
    if (modalContent === 'Gebruiker Lijst') {
      fetchUsersList();
    }
  }, [modalContent]);

  return (
    <div className="users-management">
      <Sidebar />
      <div className="content">
        <h2>Wat zou je graag willen beheren?</h2>
        <div className="tabs">
          <button onClick={() => openModal('Gebruiker Toevoegen')}>Gebruiker Toevoegen</button>
          <button onClick={() => openModal('Gebruiker Bewerken')}>Gebruiker Bewerken</button>
          <button onClick={() => openModal('Gebruiker Lijst')}>Gebruiker Lijst</button>
        </div>
      </div>

      {/* Modal voor Gebruiker Toevoegen */}
      {isModalOpen && modalContent === 'Gebruiker Toevoegen' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Voeg een nieuwe gebruiker toe</h3>
            <form onSubmit={handleSubmit} className="register-container">
              <input
                type="text"
                name="username"
                placeholder="Gebruikersnaam"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Emailadres"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Wachtwoord"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="voornaam"
                placeholder="Voornaam"
                value={formData.voornaam}
                onChange={handleChange}
              />
              <input
                type="text"
                name="achternaam"
                placeholder="Achternaam"
                value={formData.achternaam}
                onChange={handleChange}
              />
              <select
                name="gemeente"
                value={formData.gemeente}
                onChange={handleChange}
                required
              >
                <option value="">Selecteer een gemeente</option>
                <option value="Alblasserdam">Alblasserdam</option>
                <option value="Altena">Altena</option>
                <option value="Dordrecht">Dordrecht</option>
                <option value="Gorinchem">Gorinchem</option>
                <option value="Anders">Anders, namelijk...</option>
              </select>
              {formData.gemeente === "Anders" && (
                <input
                  type="text"
                  name="andereGemeente"
                  placeholder="Vul uw gemeente in"
                  value={formData.andereGemeente}
                  onChange={handleChange}
                />
              )}
              <input
                type="text"
                name="praktijknaam"
                placeholder="Praktijknaam"
                value={formData.praktijknaam}
                onChange={handleChange}
                required
              />
              <button type="submit">Gebruiker Toevoegen</button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
            <button className="close-btn" onClick={closeModal}>Sluiten</button>
          </div>
        </div>
      )}

      {/* Modal voor Gebruiker Bewerken */}
      {isModalOpen && modalContent === 'Gebruiker Bewerken' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Zoek en Bewerk Gebruiker</h3>
            <form onSubmit={handleSearchUser}>
              <input
                type="text"
                placeholder="Zoek Gebruiker"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
              <button type="submit">Zoek</button>
            </form>
            {userToEdit && (
              <form onSubmit={handleUpdateUser}>
                <input
                  type="text"
                  name="voornaam"
                  value={userToEdit.voornaam}
                  onChange={(e) => setUserToEdit({ ...userToEdit, voornaam: e.target.value })}
                />
                <input
                  type="text"
                  name="achternaam"
                  value={userToEdit.achternaam}
                  onChange={(e) => setUserToEdit({ ...userToEdit, achternaam: e.target.value })}
                />
                <input
                  type="text"
                  name="praktijknaam"
                  value={userToEdit.praktijknaam}
                  onChange={(e) => setUserToEdit({ ...userToEdit, praktijknaam: e.target.value })}
                />
                <button type="submit">Update Gebruiker</button>
              </form>
            )}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button className="close-btn" onClick={closeModal}>Sluiten</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
