"use client"

import React, { useEffect, useState } from 'react';

const CMSContent = () => {
  const [data, setData] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);

    const fetchData = async () => {
      try {
        // fetching data
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/our-story');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData.data.attributes.Our_Goal);
      } catch (e) {
        // Catch any errors and set an error message
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

  // Now `isClient` is true, render the data
  return (
    <div>
      {data}
    </div>
  );
};

export default CMSContent;