import React, { useEffect, useState } from "react";
import { createContext } from "react";
// import all_product from "../Components/Assets/all_product";


export const ShopContext = createContext(null);  //created ShopContext using createContext and assigned it null


const getDefaultCart = ()=>{                                 //This is the logic to create empty cart
  let cart ={};
for (let index = 0; index < 300+1; index++) {
    cart[index]=0;
  }
  return cart;
}



const ShopContextProvider = (props)=>{     //created a ShopContextProvider()


  const [all_product, setAll_Product] = useState([]);  //fetching all product data

  const [cartItems,setCartItems] = useState(getDefaultCart()); // use state to get all products data 


  useEffect(()=>{
fetch('http://localhost:4000/allproducts')   //getting all the products from the mongodb database
.then((response)=>response.json())
.then((data)=>setAll_Product(data))

if(localStorage.getItem('auth-token')){
  fetch('http://localhost:4000/getcart',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'auth-token':`${localStorage.getItem('auth-token')}`,
      'Content-Type':'application/json',
    },
    body:"",
  }).then((response)=>response.json())
  .then((data)=>setCartItems(data));
}
  },[])



const addToCart =(itemId)=>{                                 //logic for addtocart button 
  setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
if(localStorage.getItem('auth-token')){
  fetch('http://localhost:4000/addtocart',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'auth-token':`${localStorage.getItem('auth-token')}`,
      'Content-Type':'application/json',
    },
    body:JSON.stringify({"itemId":itemId}), 
  })
  .then((response)=>response.json())
  .then((data)=>console.log(data));
 }
}

const removeFromCart =(itemId)=>{                    // logic to remove items from cart
  setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  if(localStorage.getItem('auth-token')){
    fetch('http://localhost:4000/removefromcart',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'auth-token':`${localStorage.getItem('auth-token')}`,
      'Content-Type':'application/json',
    },
    body:JSON.stringify({"itemId":itemId}), 
  })
  .then((response)=>response.json())
  .then((data)=>console.log(data));
  }
}

const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = all_product.find((product) => product.id === Number(item));
      totalAmount += itemInfo.new_price * cartItems[item];
    }
  }
  return totalAmount;
}



const getTotalCartItems = ()=>{
let totalItem = 0;
for (const item in cartItems){
  if(cartItems[item]>0){
    totalItem += cartItems[item];
  }
}
return totalItem;
}






const contextValue = { getTotalCartItems,getTotalCartAmount, all_product,cartItems,addToCart,removeFromCart};    // a variable is created to store the data and values that 
// we want to access using context

  return(
    <ShopContext.Provider value={contextValue}>
{props.children}
    </ShopContext.Provider>
  )                         
}

export default ShopContextProvider;