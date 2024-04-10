import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {


    const [menu, setmenu] = useState("Shop")

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
            <div className="nav-login-cart">
                <Link style={{ textDecoration: 'none' }} to='/login'><button>Login</button></Link>
                <Link style={{ textDecoration: 'none' }} to='/cart'> <img src={cart_icon} alt='' /></Link>
                <div className="nav-cart-count">0</div>
            </div>

        </div>
    )
}

export default Navbar