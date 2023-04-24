import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProviders';

const Header = () => {

    const {user,loogeOut}=useContext(AuthContext);

    const handleLogOut = ()=>
    {
        loogeOut()
        .then((result)=>{})
        .catch((error)=>{
            console.error(error);
        })
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/singup">SingUp</Link>
                {
              user && <span className='text-white'>  Welcome { user.email} <button onClick={handleLogOut} >Log Out</button> </span>
                }
            </div>
        </nav>
    );
};

export default Header;