import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Zorg ervoor dat dit pad klopt met jouw projectstructuur
import "../styles/Register.css"; // Importeer de CSS

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    voornaam: "",
    achternaam: "",
    gemeente: "",
    andereGemeente: "",
    praktijknaam: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validaties
    if (!formData.username || !formData.email || !formData.password || !formData.gemeente || !formData.praktijknaam) {
      setErrorMessage("Vul alle velden in.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setErrorMessage("Wachtwoorden komen niet overeen.");
      setIsLoading(false);
      return;
    }

    if (formData.gemeente === "Anders" && !formData.andereGemeente) {
      setErrorMessage("Vul uw gemeente in wanneer u 'Anders' kiest.");
      setIsLoading(false);
      return;
    }

    const gemeenteToSend = formData.gemeente === "Anders" ? formData.andereGemeente : formData.gemeente;

    try {
      // Maak een gebruiker aan in Supabase Authentication
      const { data: user, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      // Sla aanvullende gegevens op in een aparte tabel
      const { error: dbError } = await supabase.from("users").insert({
        username: formData.username,
        voornaam: formData.voornaam,
        achternaam: formData.achternaam,
        gemeente: gemeenteToSend,
        praktijknaam: formData.praktijknaam,
        user_id: user?.user?.id, // Koppel de gegevens aan de aangemaakte gebruiker
      });

      if (dbError) {
        throw dbError;
      }

      alert("Registratie succesvol!");
      setFormData({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        voornaam: "",
        achternaam: "",
        gemeente: "",
        andereGemeente: "",
        praktijknaam: "",
      });
      setErrorMessage("");
    } catch (error) {
      console.error("Fout bij registratie:", error.message);
      setErrorMessage("Registratie mislukt. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
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
        type="password"
        name="password"
        placeholder="Wachtwoord"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Bezig met registreren..." : "Registreer"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default Register;
