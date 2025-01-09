import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"; // Importeer de Sidebar
import "../styles/SettingsPage.css"; // Importeer de CSS voor de Instellingen pagina

// API-aanroepen simuleren voor de registratiecollectie
const fetchRegistrationData = async (registrationId) => {
  try {
    const response = await fetch(`/api/registration/${registrationId}`);
    if (!response.ok) {
      throw new Error('Er is iets misgegaan met het ophalen van de gegevens.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fout bij het ophalen van registratiegegevens:", error);
    return null;
  }
};

const updateRegistrationData = async (registrationId, registrationData) => {
  try {
    const response = await fetch(`/api/registration/${registrationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });
    if (!response.ok) {
      throw new Error('Er is iets misgegaan met het bijwerken van de gegevens.');
    }
    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Fout bij het bijwerken van registratiegegevens:", error);
    return null;
  }
};

const Instellingen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    emailNotifications: false,
    smsNotifications: false,
  });
  const [registrationId, setRegistrationId] = useState('12345');  // Vervang dit met de daadwerkelijke registratie-ID

  useEffect(() => {
    // Haal de registratiegegevens op bij het laden van de pagina
    fetchRegistrationData(registrationId).then((data) => {
      if (data) {
        setRegistrationData(data);
      }
    });
  }, [registrationId]);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const saveSettings = async () => {
    const updatedData = await updateRegistrationData(registrationId, registrationData);
    if (updatedData) {
      setRegistrationData(updatedData); // Bijwerken van de UI na het opslaan van gegevens
      closeModal();
    }
  };

  return (
    <div className="settings-page">
      <Sidebar />
      <h2>Instellingen - Kies hieronder wat je graag zou willen wijzigen.</h2>
      <div className="settings-options">
        <button onClick={() => openModal('Wachtwoord Wijzigen')}>Wachtwoord Wijzigen</button>
        <button onClick={() => openModal('Profiel Aanpassen')}>Profiel Aanpassen</button>
        <button onClick={() => openModal('Meldingen Beheren')}>Meldingen Beheren</button>
      </div>

      {/* Modal Content */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalContent}</h3>

            {/* Conditional rendering for each setting */}
            {modalContent === 'Wachtwoord Wijzigen' && (
              <form className="settings-form">
                <input
                  type="password"
                  placeholder="Huidig Wachtwoord"
                  required
                />
                <input
                  type="password"
                  placeholder="Nieuw Wachtwoord"
                  required
                />
                <input
                  type="password"
                  placeholder="Bevestig Nieuw Wachtwoord"
                  required
                />
                <button type="submit">Opslaan</button>
              </form>
            )}

            {modalContent === 'Profiel Aanpassen' && (
              <form className="settings-form">
                <input
                  type="text"
                  name="name"
                  value={registrationData.name}
                  onChange={handleInputChange}
                  placeholder="Naam"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleInputChange}
                  placeholder="Emailadres"
                  required
                />
                <button type="button" onClick={saveSettings}>Opslaan</button>
              </form>
            )}

            {modalContent === 'Meldingen Beheren' && (
              <div className="settings-form">
                <label>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={registrationData.emailNotifications}
                    onChange={handleCheckboxChange}
                  />
                  E-mail Meldingen
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={registrationData.smsNotifications}
                    onChange={handleCheckboxChange}
                  />
                  SMS Meldingen
                </label>
                <button type="button" onClick={saveSettings}>Opslaan</button>
              </div>
            )}

            <button className="close-btn" onClick={closeModal}>
              Sluiten
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instellingen;
