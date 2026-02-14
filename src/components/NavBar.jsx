import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { NavLink,Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
const NavBar = () => {
  const [showDropDown , setShowDropDown] = useState(false);
  const [showSidebar , setShowSidebar] = useState(false);
  const { setShowSearch , getCartCount} = useContext(ShopContext);  //serch logo
  const {navigate,token,setToken,setCartItems} = useContext(ShopContext);

  const logOut = () => {
    setToken('');
    setCartItems({});
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='navbar'>
  <Link to='/'><img src={assets.logo} alt="Logo" /></Link>
  
  <div className='nav-links'>
    <NavLink to="/"  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
      <p>HOME</p>
    </NavLink>
    <NavLink to="/Collection"  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
      <p>COLLECTION</p>
    </NavLink>
    <NavLink to="/About"  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
      <p>ABOUT</p>
    </NavLink>
    <NavLink to="/Contact"  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
      <p>CONTACT</p>
    </NavLink>
  </div>

  <div className='nav-logo'>
    <div className='nav-search'>
      <img src={assets.search_icon} alt="search" onClick={() => setShowSearch(true)}/>
    </div>

    <div className="nav-profile">
  <img src={assets.profile_icon} alt="profile" onClick={() => {
      if (token) {
        setShowDropDown(!showDropDown);
      } else {
        navigate("/login");
      }
    }}
  />

  {token && showDropDown && (
    <div className="dropdown" onClick={(e) => e.stopPropagation()}>
      <Link>MyProfile</Link>
      <Link to="/Orders">Orders</Link>
      <button onClick={logOut}>LogOut</button>
    </div>
  )}
</div>


    <Link to="/Cart" className='nav-cart'>
      <img src={assets.cart_icon} alt="cart" />
      <p>{getCartCount()}</p>
    </Link>
{/*Sidebar menu for small screens*/}
    <div className='nav-menu'>
      <img src={assets.menu_icon} onClick={() => setShowSidebar(true)} alt="menu" />
      {  showSidebar && (
         <div className='side-bar'>
        <button className='close-btn' onClick={() => setShowSidebar(false) }>BACK</button>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/Collection">COLLECTION</NavLink>
        <NavLink to="/About">ABOUT</NavLink>
        <NavLink to="/Contact">CONTACT</NavLink>

      </div>
      )}
    </div>
  </div>
</div>
  )}

export default NavBar;
