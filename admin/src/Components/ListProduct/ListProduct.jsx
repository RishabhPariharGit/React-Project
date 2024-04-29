import React, { useEffect, useState } from 'react'
import './List_Product.css'
import cross_icon from '../../assets/cart_cross_icon.png'

const ListProduct = () => {

const [allproducts, setAllproducts] = useState([]);

const fetchInfo = async()=>{
  await fetch('http://localhost:4000/allproducts')             //fetched the all products from its path
  .then((res)=>res.json())                           //converted the data into json format
  .then((data)=>{setAllproducts(data)});             //saved the data in setallproduct state variable
}


useEffect(()=>{
  fetchInfo();
},[])             //this function will executed only once because of []


const remove_product = async (id)=>{                     //added the logic to remove product from the Admin Panel and the database
  await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
}
  return (
    <div className="list-product">
<h1>All Products Lsit</h1>

<div className="listproduct-format-main">
  <p>Products</p>
  <p>Title</p>
  <p>Old Price</p>
  <p>New Price</p>
  <p>Category</p>
  <p>Remove</p>
</div>
<div className="listproduct-allproducts">
{allproducts.map((product,index)=>{
    return <><div key={index} className="listproduct-format-main listproduct-format">
      <img src={product.image} alt="" className="listproduct-product-icon" />
<p>{product.name}</p>    
<p>${product.old_price}</p>
<p>${product.new_price}</p>
<p>{product.category}</p>
<img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />

    </div> 
    <hr />  
    </>                               //created a template to map all the products
})}
</div>
    </div>
  )
}

export default ListProduct