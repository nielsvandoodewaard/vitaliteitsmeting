import React, { useEffect } from 'react';
import UserSidebar from './UserSidebar';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const formUrl = 'https://form.jotform.com/250063902679359'; // Je formulier-URL

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://form.jotform.com/jsform/250063902679359`;
    script.async = true;
    document.getElementById('form-container').appendChild(script);

    return () => {
      document.getElementById('form-container').removeChild(script);
    };
  }, []);

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
