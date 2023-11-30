"use client"

import React, { useEffect, useState } from 'react';

const CMSContent = () => {
  const [data, setData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  useEffect(() => {
    setIsClient(true);

    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/store-hour');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData.data.attributes);
      } catch (e) {
        setError(e.message);
        console.error("Fetch error: ", e.message);
      }
    };

    if (isClient) {
      fetchData();
    }
  }, [isClient]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data ? (
        Object.entries(data)
          .filter(([key]) => daysOfWeek.includes(key))
          .map(([day, timeSlot], index) => (
            <li key={index}>
              <strong>{day}</strong> {timeSlot}
            </li>
          ))
      ) : (
        <div>Loading store hours...</div>
      )}
    </div>
  );
};

export default CMSContent;