import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css"; // Importeer de CSS

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "", // Voeg een wachtwoord bevestigingsveld toe
    voornaam: "",
    achternaam: "",
    gemeente: "", // Voeg gemeente toe
    andereGemeente: "", // Voeg een extra veld toe voor 'Anders' gemeente
    praktijknaam: "", // Voeg praktijknaam toe
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Lade-indicator

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Zet de laadindicator aan

    // Basis validatie
    if (!formData.username || !formData.email || !formData.password || !formData.gemeente || !formData.praktijknaam) {
      setErrorMessage("Vul alle velden in.");
      setIsLoading(false);
      return;
    }

    // Wachtwoordbevestiging validatie
    if (formData.password !== formData.passwordConfirm) {
      setErrorMessage("Wachtwoorden komen niet overeen.");
      setIsLoading(false);
      return;
    }

    // Gemeente validatie als 'Anders' wordt gekozen
    if (formData.gemeente === "Anders" && !formData.andereGemeente) {
      setErrorMessage("Vul uw gemeente in wanneer u 'Anders' kiest.");
      setIsLoading(false);
      return;
    }

    // Voeg 'Anders' gemeente toe aan het formulier
    const gemeenteToSend = formData.gemeente === "Anders" ? formData.andereGemeente : formData.gemeente;

    try {
      // Verstuur het registratieverzoek naar de Strapi API (gebruik de juiste endpoint voor je configuratie)
      const response = await axios.post(
        "http://localhost:1337/api/registrations", // Dit is de endpoint voor de 'User' collectie
        {
          data: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            gemeente: gemeenteToSend, // Gemeente toevoegen aan de payload
            praktijknaam: formData.praktijknaam, // Praktijknaam toevoegen aan de payload
            voornaam: formData.voornaam, // Voeg voornaam toe aan de payload
            achternaam: formData.achternaam, // Voeg achternaam toe aan de payload
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      alert("Registratie succesvol!");
      console.log("Gebruiker aangemaakt:", response.data);

      // Herinitialiseren van formData na succesvolle registratie
      setFormData({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "", // Herinitialiseren van wachtwoord bevestiging
        voornaam: "",
        achternaam: "",
        gemeente: "", // Herinitialiseren van gemeente
        andereGemeente: "", // Herinitialiseren van andere gemeente
        praktijknaam: "", // Herinitialiseren van praktijknaam
      });
      setErrorMessage(""); // Verwijder foutmelding na succes
    } catch (error) {
      console.error("Fout bij registratie:", error);
      setErrorMessage("Registratie mislukt. Probeer het opnieuw.");
    } finally {
      setIsLoading(false); // Zet de laadindicator uit
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-container">
      <h2>Registreerpagina</h2>
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
        name="password"
        placeholder="Wachtwoord"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        name="passwordConfirm"
        placeholder="Bevestig wachtwoord"
        value={formData.passwordConfirm}
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
      
      {/* Gemeente dropdown */}
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
        <option value="HardinxveldGiessendam">Hardinxveld-Giessendam</option>
        <option value="Hendrik-IdoAmbacht">Hendrik-Ido-Ambacht</option>
        <option value="Molenlanden">Molenlanden</option>
        <option value="Papendrecht">Papendrecht</option>
        <option value="Sliedrecht">Sliedrecht</option>
        <option value="Vijfheerenlanden">Vijfheerenlanden</option>
        <option value="West-Betuwe">West-Betuwe</option>
        <option value="Zwijndrecht">Zwijndrecht</option>
        <option value="Anders">Anders, namelijk...</option>
      </select>

      {/* Tekstveld voor andere gemeente, zichtbaar alleen als 'Anders' is geselecteerd */}
      {formData.gemeente === "Anders" && (
        <input
          type="text"
          name="andereGemeente"
          placeholder="Vul uw gemeente in"
          value={formData.andereGemeente}
          onChange={handleChange}
        />
      )}

      {/* Praktijknaam veld */}
      <input
        type="text"
        name="praktijknaam"
        placeholder="Praktijknaam"
        value={formData.praktijknaam}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Bezig met registreren..." : "Registreer"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default Register;
