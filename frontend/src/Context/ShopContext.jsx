import React from "react";
import { createContext } from "react";
import all_product from "../Components/Assets/all_product";


export const ShopContext = createContext(null);  //created ShopContext using createContext and assigned it null


const ShopContextProvider = (props)=>{                 //created a ShopContextProvider()
  const contextValue = {all_product};    // a variable is created to store the data and values that 
                                        // we want to access using context
  return(
    <ShopContext.Provider value={contextValue}>
{props.children}
    </ShopContext.Provider>
  )                         
}

export default ShopContextProvider;