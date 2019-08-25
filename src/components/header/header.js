import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import './header.css'

class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <NavLink to='/'><Navbar.Brand>Music Store</Navbar.Brand></NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <NavLink to="/">Features</NavLink>
                        <NavLink to="/">Pricing</NavLink> */}
                    </Nav>
                    <Nav className='navbar_right'>
                        <NavLink className='link' to="/cart">Cart</NavLink>
                        <NavLink className='link' to="/admin">Admin</NavLink>
                        <NavLink className='link' to="/register">Register</NavLink>
                        <NavLink className='link' to="/login">Login</NavLink>
                        <NavLink className='link' to="/">Logout</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
