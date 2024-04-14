import React, { useState } from "react";
import { createContext } from "react";
import all_product from "../Components/Assets/all_product";


export const ShopContext = createContext(null);  //created ShopContext using createContext and assigned it null


const getDefaultCart = ()=>{                                 //This is the logic to create empty cart
  const cart ={};
for (let index = 0; index < all_product.length+1; index++) {
    cart[index]=0;
  }
  return cart;
}



const ShopContextProvider = (props)=>{     //created a ShopContextProvider()

  const [cartItems,setCartItems] =useState(getDefaultCart()); // use state to get all products data 

const addToCart =(itemId)=>{
  setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
  console.log(cartItems);
}

const removeFromCart =(itemId)=>{
  setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
}

const contextValue = {all_product,cartItems,addToCart,removeFromCart};    // a variable is created to store the data and values that 
// we want to access using context

  return(
    <ShopContext.Provider value={contextValue}>
{props.children}
    </ShopContext.Provider>
  )                         
}

export default ShopContextProvider;