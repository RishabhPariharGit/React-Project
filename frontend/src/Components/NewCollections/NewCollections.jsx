import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import new_collection from '../Assets/new_collections'


export default function NewCollections() {
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
