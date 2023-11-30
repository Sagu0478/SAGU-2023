"use client";
import React, { useState } from "react";
import ShoppingCart from "./shoppingCart";
import { useAppContext } from "@/contexts/Provider";

const URL = "/api/accessMenu";
const url1 = `http://localhost:3001${URL}`;
const URLS = [url1];



export const AddItems = ({set}) => {

    const [getID, setID] = useState('');
    const [getName, setName]    = useState('');
    const [getPrice, setPrice]  = useState('');
    const [getQuantity, setQuantity]  = useState('');
    const [multipleItem, setMultipleItem] = useState('');
    const {cartItems, addToCart, removeFromCart, clearCart} = useAppContext();

    

    const handleAddToCart = async (event, shoppingCart) => {
        event.preventDefault(); //Prevent default behavior

        try {
            const response = await fetch(URLS[0], {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ getName, getPrice }),
            });

            const result = await response.json();

            if (response.status === 401) {
                alert(result.message);
            }
            else if(response.status === 200) {
                setID(result.item.id)
                setName(result.item.name);
                setPrice(result.item.base_price);
                addToCart(result);
                alert("Added to Cart!");
            }

        }
        catch (err){
            console.error("Add to Cart error: ", err);
            alert("Unable to add to cart. Please try again.");
        }
    };



    return(
        <div>
            <div>
                
            </div>
        </div>
    )
}