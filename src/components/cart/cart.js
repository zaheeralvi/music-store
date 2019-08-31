import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './cart.css'
import Spinner from 'react-bootstrap/Spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { throwStatement } from '@babel/types';

class Cart extends Component {

    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            cart: [],
            album: [],
            loading: true,
            totalPrice: 0
        }

        this.getCartData();
    }

    notify = (msg) => toast(msg);

    getCartData() {
        let id = localStorage.getItem('userID');
        if (id != '' && id != undefined && id != null) {
            axios.get('/api/cart/' + id).then(response => {
                console.log(response)
                let list_ids = [];
                let albumList = [];
                for (let i = 0; i < response.data.cart.length; i++) {
                    if (!list_ids.includes(response.data.cart[i].album._id)) {

                        list_ids = [...list_ids, response.data.cart[i].album._id]
                        response.data.cart[i] = { ...response.data.cart[i], qty: 1 }
                        albumList = [...albumList, response.data.cart[i]]

                        // console.log('doest include')
                        // console.log(list_ids)
                        // console.log(albumList)
                    } else {
                        for (let j = 0; j < albumList.length; j++) {
                            // console.log(response.data.cart[i].album._id+' '+albumList[j].album._id)
                            if (response.data.cart[i].album._id == albumList[j].album._id) {
                                albumList[j].qty = albumList[j].qty + 1;
                                // console.log(albumList[j])
                            }
                        }
                        // console.log('include')
                        // console.log(list_ids)
                        // console.log(albumList)
                    }
                }
                let totalPrice = 0;
                for (let i = 0; i < albumList.length; i++) {
                    totalPrice = totalPrice + (albumList[i].qty * albumList[i].album.price)
                }
                console.log(totalPrice)
                this.setState({
                    album: albumList,
                    loading: false,
                    totalPrice: totalPrice
                })


            }, error => {
                console.log(error)
            })
        } else {
            this.notify('Login to Add Items into Cart')
            // console.log('Login to Add Items into Cart')
        }
    }

    removeHandler(id) {
        // console.log(id)
        let cart = this.state.cart;
        cart = cart.filter(c => c.album_id === id);
        // console.log(cart)
        axios.delete('/api/cart/' + id).then(response => {
            console.log(response)
            if (response.status === 200) {
                if (response.data.cart.n > 0) {
                    this.notify('Cart Updated Successfully')
                    let data = this.state.album;
                    data = data.filter(a => a.album._id !== id)
                    this.setState({
                        album: data,
                    })
                }
            } else {
                console.log('Error Message')
            }
        }, error => {
            console.log(error)
        })
    }

    checkoutHandler() {
        // console.log(this.state.album)
        if (this.state.album.length > 0) {
            let title = []
            for (let i = 0; i < this.state.album.length; i++) {
                title = [...title, this.state.album[i].album.title]
            }
            let data = {
                album: title,
                username: localStorage.getItem('username'),
                user_id: localStorage.getItem('userID'),
            }
            axios.post('/api/checkout', data).then(response => {
                console.log(response)
                if (response.data.status === 200) {
                    this.setState({
                        album: [],
                        cart: []
                    })
                    this.notify('Order Placed Successfully')
                    this.props.history.push('/')
                }
            })
        } else {
            this.props.history.push('/')
        }
    }

    render() {
        var { cart, album } = this.state;
        return (
            <div className='artist_page'>
                <ToastContainer />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 pt-5'>
                            <NavLink to='/' className='back mb-3'>Back</NavLink>

                            <div className='albums table-responsive'>
                                <table className='table table-bordered table-striped table-hover'>
                                    <tr>
                                        <th>Title</th>
                                        <th>Artist Name</th>
                                        <th className='text-center'>Unit Price ($)</th>
                                        <th className='text-center'>Quantity</th>
                                        <th></th>
                                    </tr>
                                    {
                                        album.map(item => (
                                            <tr>
                                                <td>{item.album.title}</td>
                                                <td>{item.album.artist.name}</td>
                                                <td className='text-center'>{item.album.price}</td>
                                                <td className='text-center'>{item.qty}</td>
                                                <td><button onClick={() => this.removeHandler(item.album._id)} className='remove ml-3'>remove</button></td>
                                            </tr>
                                        ))
                                    }
                                    {
                                        this.state.loading ? <Spinner animation="grow" /> : null
                                    }
                                    {
                                        album.length === 0 ? <li>No Data Found</li> : null
                                    }

                                    {/* <li>Album Title 2 - Artist - Price: <span className='price'>$ 5</span> <span className='remove ml-3'>remove</span></li>
                                    <li>Album Title 3 - Artist - Price: <span className='price'>$ 5</span> <span className='remove ml-3'>remove</span></li>
                                    <li className='total'>Total: $ 15</li> */}
                                    {album.length > 0 ?
                                        <tr>
                                            <td colSpan='2'><strong>Total: ($)</strong></td>
                                            <td className='text-center'><strong>{this.state.totalPrice}</strong></td>
                                            <td colSpan='2' className='text-right'>
                                                <button className='checkout' onClick={() => this.checkoutHandler()}>Checkout</button>
                                            </td>
                                        </tr>
                                        : null}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;
