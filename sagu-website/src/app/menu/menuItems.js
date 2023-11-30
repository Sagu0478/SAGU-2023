import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuGallary from "./menuGallary";

const MenuItems = ({ category }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {

      try {
        let url;
        const encodedCategory = encodeURIComponent(category);

        if (category === "Sagu's Menu") {
          url = process.env.NEXT_PUBLIC_API_URL + `/api/menu-items?filters[Hide][$eq]=false&populate=Photo`;
        } else {
          url = process.env.NEXT_PUBLIC_API_URL + `/api/menu-items?filters[Type][$eq]=${encodedCategory}&filters[Hide][$eq]=false&populate=Photo`;
        }

        console.log(url);

        const response = await axios.get(url);

        console.log(response);

        const items = response.data.data.map((item) => ({
          id: item.id,
          title: item.attributes.Title,
          price: (item.attributes.Price / 100).toFixed(2),
          imageUrl: item.attributes.Photo.data.length > 0 ? item.attributes.Photo.data[0].attributes.url : null,
          imageFormats: item.attributes.Photo.data.length > 0 ? item.attributes.Photo.data[0].attributes.formats : {}
        }));

        setMenuItems(items);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };

    if (category) {
      fetchMenuItems();
    }
  }, [category]);

  if (!menuItems.length) {
    return <div>No menu items available for this category. Please check back soon!</div>;
  }

  return (
    <div>
      <MenuGallary menuItems={menuItems} />
    </div>
  );
};

export default MenuItems;