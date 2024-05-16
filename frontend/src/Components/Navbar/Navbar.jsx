import React, { useContext } from 'react'
import { useState } from 'react'
import './Navbar.css'
import product_list from '../Assets/all_product'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { BsSearch } from 'react-icons/bs';

const Navbar = () => {

    const sercherr = "error"


    const [menu, setmenu] = useState("Shop");
    const {getTotalCartItems} = useContext(ShopContext);

    // Start of search filter
    const [products, setProducts] = useState(product_list);
    const [searchVal, setSearchVal] = useState("");
   

    function handleSearchClick() {
        if (searchVal === "") {
            setProducts([]); // Set products to an empty array when search box is empty
            return;
        }
    
        const filterBySearch = product_list.filter((item) => {
            return item.name.toLowerCase().includes(searchVal.toLowerCase());
        });
    
        console.log("Filtered products:", filterBySearch);
    
        setProducts(filterBySearch);
    }


    const mystyle = {
        // marginLeft: "600px",
        marginTop: "20px",
        fontWeight: "700"
    };

    //end of search filter


    return (
        <div className="navbar">
            <div className="nav-logo">
            <Link style={{ textDecoration: 'none' }} to='/'> <img src={logo} alt='' /></Link>
                <p>Shopper</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => { setmenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kid</Link>{menu === "kids" ? <hr /> : <></>}</li>

            </ul>
            {/* search filter */}
            <div>
    <div style={mystyle}>
        <input 
            onChange={e => { 
                setSearchVal(e.target.value);
                console.log("Search value:", e.target.value);
            }}
        />
        <BsSearch onClick={handleSearchClick} />
    </div>
    <div className='Product_Search_box'>
        {searchVal.trim() !== '' && products.length > 0 ? (
            products
                .filter(product => product.name.toLowerCase().includes(searchVal.toLowerCase()))
                .slice(0, 3)
                .map((product) => (
                    <a href={`/product/${product.id}`} key={product.id} className='Product_main_search_Box'>{product.name}</a>
                ))
        ) : (
           [sercherr] 
            
        )}
    </div>
</div>
{/* end of search filter */}
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link style={{ textDecoration: 'none' }} to='/login'><button>Login</button></Link>}
                
                <Link style={{ textDecoration: 'none' }} to='/cart'> <img src={cart_icon} alt='' /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>

        </div>
    )
}


export default Navbar