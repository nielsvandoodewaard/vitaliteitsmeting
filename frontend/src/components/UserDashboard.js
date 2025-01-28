import React, { useEffect } from 'react';
import UserSidebar from './UserSidebar';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const formUrl = 'https://www.survio.com/survey/d/C4V2W3P1W6F6I9S1L'; // Correcte formulier-URL

  useEffect(() => {
    // Controleer of het script al is toegevoegd
    if (!document.getElementById('survio-script')) {
      const script = document.createElement('script');
      script.src = formUrl;
      script.id = 'survio-script'; // Unieke ID om duplicaten te vermijden
      script.async = true;
      document.getElementById('form-container').appendChild(script);

      return () => {
        const existingScript = document.getElementById('survio-script');
        if (existingScript) {
          document.getElementById('form-container').removeChild(existingScript);
        }
      };
    }
  }, [formUrl]); // Zorg ervoor dat het script alleen opnieuw geladen wordt als de URL verandert

  return (
    <div className="user-dashboard">
      <UserSidebar />
      <div className="form-container" id="form-container">
        <h2>Welkom! Vul hieronder de enquete in die klaarstaat. :)</h2>
        {/* Het formulier wordt hier dynamisch geladen via het script */}
      </div>
    </div>
  );
};

export default UserDashboard;
