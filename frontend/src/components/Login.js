import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../utils/axiosConfig"; // Zorg ervoor dat het pad klopt
import "../styles/Login.css"; // Importeer de CSS

// Het logo importeren
import logo from "./logo_2.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Lade-indicator
  const navigate = useNavigate();

  useEffect(() => {
    // Controleer of er al een geldig JWT-token is bij het laden van de pagina
    const token = localStorage.getItem("jwt");
    if (token) {
      setAuthToken(token);
      navigate("/UserDashboard"); // Als er een token is, stuur de gebruiker naar het dashboard
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Zet de laadindicator aan

    // Zorg ervoor dat het emailadres een geldig formaat heeft
    if (!email || !password) {
      setMessage("Vul zowel email als wachtwoord in.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("api/auth/local", {
        identifier: email,
        password: password,
      });
      const { jwt, user } = response.data;

      // Sla de JWT op in localStorage
      localStorage.setItem("jwt", jwt);
      setAuthToken(jwt);

      setMessage(`Welkom ${user.username}!`);

      // Redirect naar het dashboard
      navigate("/dashboard");
    } catch (err) {
      setMessage("Inloggen mislukt. Controleer je gegevens.");
      console.error(err); // Print de error voor debugging
    } finally {
      setIsLoading(false); // Zet de laadindicator uit
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="login-logo" />
      </div>

      <h2>Inlogpagina - Vitaliteitsmeting</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email adres"
          />
        </div>
        <div>
          <label>Wachtwoord:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Wachtwoord"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Bezig met inloggen..." : "Inloggen"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Geen account? <a href="/register">Account Aanmaken</a>
      </p>
    </div>
  );
};

export default Login;
