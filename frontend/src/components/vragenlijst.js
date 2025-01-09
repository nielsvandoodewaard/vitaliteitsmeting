import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BeantwoordenVragenlijst = () => {
  const { id } = useParams(); // ID van de vragenlijst uit de URL
  const [vragenlijst, setVragenlijst] = useState(null);
  const [antwoorden, setAntwoorden] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:1337/api/surveys/${id}`)
      .then(response => {
        setVragenlijst(response.data);
      })
      .catch(error => {
        console.error("Error fetching vragenlijst:", error);
      });
  }, [id]);

  const handleInputChange = (e, vraagId) => {
    setAntwoorden({
      ...antwoorden,
      [vraagId]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1337/api/antwoorden', {
      vragenlijst_id: id,
      antwoorden,
    })
      .then(response => {
        alert("Antwoorden ingediend!");
      })
      .catch(error => {
        console.error("Error submitting answers:", error);
      });
  };

  if (!vragenlijst) return <p>Laden...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>{vragenlijst.title}</h1>
      {vragenlijst.vragen.map((vraag) => (
        <div key={vraag.id}>
          <label>{vraag.text}</label>
          <input
            type="text"
            value={antwoorden[vraag.id] || ""}
            onChange={(e) => handleInputChange(e, vraag.id)}
          />
        </div>
      ))}
      <button type="submit">Verstuur</button>
    </form>
  );
};

export default BeantwoordenVragenlijst;
