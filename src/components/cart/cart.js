import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './cart.css'
class Cart extends Component {

    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            cart: [],
            album: []
        }

        this.getCartData();
    }


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
                this.setState({
                    album: albumList,
                })


            }, error => {
                console.log(error)
            })
        } else {
            console.log('Login to Add Items into Cart')
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
                let data = this.state.album;
                data = data.filter(a => a.album._id !== id)
                this.setState({
                    album: data,
                })
            } else {
                console.log('Error Message')
            }
        }, error => {
            console.log(error)
        })
    }

    checkoutHandler() {
        console.log(this.state.album)
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
            }
        })
    }

    render() {
        var { cart, album } = this.state;
        return (
            <div className='artist_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 pt-5'>
                            <NavLink to='/' className='back mb-3'>Back</NavLink>

                            <div className='albums'>
                                <ul className='list-unstyled'>

                                    {
                                        album.map(item => (
                                            <li>{item.album.title} - {item.album.artist.name} - Price: <span className='price'>$ {item.album.price} Quantity: {item.qty}</span> <button onClick={() => this.removeHandler(item.album._id)} className='remove ml-3'>remove</button></li>
                                        ))
                                    }
                                    {
                                        album.length === 0 ? <li>No Data Found</li> : null
                                    }

                                    {/* <li>Album Title 2 - Artist - Price: <span className='price'>$ 5</span> <span className='remove ml-3'>remove</span></li>
                                    <li>Album Title 3 - Artist - Price: <span className='price'>$ 5</span> <span className='remove ml-3'>remove</span></li>
                                    <li className='total'>Total: $ 15</li> */}
                                </ul>
                                <button className='checkout' onClick={() => this.checkoutHandler()}>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;
