import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './header.css'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogged: false,
            isAdmin: false
        }

        setInterval(() => {
            if (localStorage.getItem('loggedUser') === 'true') {
                this.setState({
                    isLogged: true
                })
            }

            if (localStorage.getItem('userRole') === 'admin') {
                this.setState({
                    isAdmin: true
                })
            }
        }, 500);
    }

    logoutHandler() {
        localStorage.removeItem('loggedUser');
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        this.setState({
            isLogged: false,
            isAdmin: false
        })
        console.log(this.props.history);
        // this.props.history.push('/');
    }

    render() {
        var { isAdmin, isLogged } = this.state;
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
                        {this.state.isAdmin ?
                            <NavLink className='link' to="/admin">Admin</NavLink>
                            : null}
                        {!this.state.isLogged ?
                            <NavLink className='link' to="/register">Register</NavLink>
                            : null}
                        {!this.state.isLogged ?
                            <NavLink className='link' to="/login">Login</NavLink>
                            : null}
                        <NavLink className='link' to="/cart">Cart</NavLink>
                        {this.state.isLogged ?
                            <button className='link' onClick={() => this.logoutHandler}>Logout</button>
                            : null}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
