import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; // Zorg ervoor dat het pad klopt
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
    const token = localStorage.getItem("supabase_token");
    if (token) {
      navigate("/Login"); // Als er een token is, stuur de gebruiker naar het dashboard
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Zet de laadindicator aan

    // Controleer of zowel email als wachtwoord zijn ingevuld
    if (!email || !password) {
      setMessage("Vul zowel email als wachtwoord in.");
      setIsLoading(false);
      return;
    }

    try {
      // Authenticeren met Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      const { session, user } = data;

      // Sla de token en gebruiker op in localStorage
      localStorage.setItem("supabase_token", session.access_token);
      localStorage.setItem("supabase_user", JSON.stringify(user));

      setMessage(`Welkom ${user.email}!`);

      // Redirect naar het dashboard
      navigate("/UserDashboard");
    } catch (err) {
      setMessage("Inloggen mislukt. Controleer je gegevens.");
      console.error("Login error:", err);
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
