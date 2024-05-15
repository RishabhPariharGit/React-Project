import React, { useEffect, useState } from "react";
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'

const Popular = () => {

    const [popularProducts, setpopularProducts] = useState([]);  //fetching all product data


    useEffect(()=>{
        fetch('http://localhost:4000/popularinwomen')   //getting all the products from the mongodb database
        .then((response)=>response.json())
        .then((data)=>setpopularProducts(data))
          },[])
        



    return (
        <div className="popular">
            <h2>POPULAR IN WOMEN</h2>
            <hr />
            <div className="popular-item">
                {popularProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular