import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiCaller = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://178.128.107.238:5000/api/tenant/allPlant');
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []); // Dependency array kosong agar hanya dijalankan sekali saat komponen dipasang

  return (
    <div>
      {error && <p>Error fetching data: {error.message}</p>}
      {data && Array.isArray(data) && (
        <div>
          <h2>Data:</h2>
          {data.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiCaller;
