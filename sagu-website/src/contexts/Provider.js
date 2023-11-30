"use client";

// Provider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

// Create a context
const AppContext = createContext();

// Export a hook that can be used to access the context
export const useAppContext = () => useContext(AppContext);

const Provider = ({ children, session }) => {
  // Define the states you want to provide globally
  const [navbarOpen, setNavbarOpen] = useState(false); // State for navbar toggle
  const [cartOpen, setCartOpen] = useState(false); // State for shopping cart toggle
  const [searchOpen, setSearchOpen] = useState(false); // State for search bar toggle
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [user, setUser] = useState(null); // State for user details
  const [cartItems, setCartItems] = useState([]); // State for shopping cart items
  const [checkoutTotal, setCheckoutTotal] = useState(null); // State for checkout total
  const [selectedTip, setSelectedTip] = useState(null);
  const [isCustomTipActive, setIsCustomTipActive] = useState(false);

  useEffect(() => {
    // On initial load, check if user data exists in localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      setIsLoggedIn(true); // Set isLoggedIn to true if user data is found
    }

    // On initial load, retrieve the checkout total from local storage
    const storedCheckoutTotal = localStorage.getItem("checkoutTotal");
    if (storedCheckoutTotal) {
      setCheckoutTotal(parseFloat(storedCheckoutTotal).toFixed(2));
    }

    const storedTip = localStorage.getItem("selectedTip");
    if (storedTip) {
      setSelectedTip(parseFloat(storedTip).toFixed(2));
    }

    // Optionally, retrieve the cart items from local storage as well
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    // Save the selected tip to localStorage when it changes
    if (selectedTip !== null) {
      localStorage.setItem("selectedTip", selectedTip.toString());
    } else {
      localStorage.removeItem("selectedTip");
    }
  }, [selectedTip]);

  const updateCheckoutTotal = () => {
    if (checkoutTotal !== null) {
      localStorage.setItem("checkoutTotal", checkoutTotal.toString());
    }else {
      localStorage.removeItem("checkoutTotal");
    }
  };

  // Call this function when the user logs in
  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true); // Update the isLoggedIn state
  };

  // Call this function when the user logs out
  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setIsLoggedIn(false); // Update the isLoggedIn state
  };

  // Functions to manipulate cart items
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      // Find the index of the item in the cart that matches the new item's name
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id
      );

      let updatedItems;

      if (existingItemIndex > -1) {
        // If the item exists, update the quantity
        const existingItem = prevItems[existingItemIndex];
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity,
        };
      } else {
        // If the item doesn't exist, add it as a new entry
        updatedItems = [...prevItems, newItem];
      }

      // Update local storage with the new cart items array
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Update local storage
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems"); // Clear cart items from local storage
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) => {
      let updatedItems;

      if (newQuantity < 1) {
        // Remove the item from the cart if the new quantity is less than 1
        updatedItems = prevItems.filter((item) => item.id !== itemId);
      } else {
        // Update the quantity of the item
        updatedItems = prevItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Update local storage
      return updatedItems;
    });
  };

  // Create a value that will be provided to consumers
  const contextValue = {
    navbarOpen,
    setNavbarOpen,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    isLoggedIn,
    setIsLoggedIn,
    user,
    login,
    logout,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItemQuantity,
    checkoutTotal,
    setCheckoutTotal,
    updateCheckoutTotal,
    selectedTip,
    setSelectedTip,
    isCustomTipActive,
    setIsCustomTipActive,
  };

  return (
    <SessionProvider session={session}>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </SessionProvider>
  );
};

export default Provider;
