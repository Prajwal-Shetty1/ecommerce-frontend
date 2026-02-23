import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrdered from './pages/PlaceOrdered';
import Orders from './pages/Orders';
import './index.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//entire application on refresh for login,signup
import { useEffect, useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import Verify from './pages/Verify';



const App = () => {

 
  const { token, setToken } = useContext(ShopContext);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <NavBar />
      <SearchBar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Collection' element={<Collection />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Product/:ProductId' element={<Product />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Placed-Order' element={<PlaceOrdered />} />
        <Route path='/Orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
