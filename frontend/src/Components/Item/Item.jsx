import React, { useContext } from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext';


const Item = (props) => {


// const {product} = props;
const {addToCart} = useContext(ShopContext);

    return (
        <div className="item" style={{textdecoration:'none'}}>
           <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt='' /></Link> 
           <Link to={`/product/${props.id}`} ><p>{props.name}</p></Link> 


            <button onClick={()=>{addToCart(props.id)}}>Add to Cart</button>


            <div className="item-prices">
                <div className="item-price-new">
                    ${props.new_price}
                </div>
                <div className="item-price-old">
                    ${props.old_price}
                </div>
            </div>
        </div>
    )
}

export default Item