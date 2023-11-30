"use client";

import React, { useState, useEffect } from "react";
import PromoGrid from "./promoGrid";
import axios from "axios";

const PostedPromos = () => {
    const [promos, setPromos] = useState([]);

  useEffect(() => {
    const fetchPromos = async () => {

      try {

        const url = process.env.NEXT_PUBLIC_API_URL + `/api/promos?populate=Image`;
        console.log(url);
        const response = await axios.get(url);

        console.log(response);

        const items = response.data.data.map((item) => ({
          id: item.id,
          title: item.attributes.Title,
          description: item.attributes.Description,
          note: item.attributes.Terms,
          imageUrl: item.attributes.Image.data.attributes.url
        }));

        setPromos(items);
      } catch (error) {
        console.error("Failed to fetch promos:", error);
      }
    };

    fetchPromos();
  }, []);

  if (!promos.length) {
    return <div>No promos available right now. Please check back soon!</div>;
  }

  return (
    <div>
      <PromoGrid promos={promos} />
    </div>
  );
};

export default PostedPromos;