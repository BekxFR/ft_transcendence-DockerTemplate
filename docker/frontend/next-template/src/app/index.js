import React, { useEffect, useState } from 'react';

const MyPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/test'); // Remplacez l'URL par l'endpoint approprié de votre backend
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du backend', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default MyPage;
