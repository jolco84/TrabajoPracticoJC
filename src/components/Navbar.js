import "./navbar.css"
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import Context from "../Context";

export default function Navbar() {

  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);
  

  return (
    <nav className="navbar">
      <NavLink to="/" className={setActiveClass}> 🍕Pizzeria Mamma Mia! </NavLink> 
      <NavLink to="/carrito" className={setActiveClass}> <h4>🛒 </h4></NavLink>
    </nav>
  );
}