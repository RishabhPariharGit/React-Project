import React, { useState, useEffect } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
// import new_collection from '../Assets/new_collections'


export default function NewCollections() {

  const [new_collection, setnew_collection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')   //getting all the products from the mongodb database
    .then((response)=>response.json())
    .then((data)=>setnew_collection(data))
      },[])

  return (
    <div className="new-collections">
    <h1>NEW ARRIVALS</h1>
    <hr />
    <div className="NewCollection-item">
        {new_collection.map((item, i) => {
            return <Item  key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
    </div>
</div>
  )
}
