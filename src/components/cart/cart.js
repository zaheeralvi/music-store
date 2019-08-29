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
        axios.get('/api/cart/' + id).then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({
                    cart: response.data.cart,
                    album: response.data.albums
                })
            } else {
                console.log('Error Message')
            }
        }, error => {
            console.log(error)
        })
    }

    removeHandler(id) {
        // console.log(id)
        let cart = this.state.cart;
        cart=cart.filter(c=>c.album_id===id);
        // console.log(cart)
        axios.delete('/api/cart/' + id).then(response => {
            // console.log(response)
            if (response.status === 200) {
                let data = this.state.album;
                data = data.filter(a => a._id !== id)
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
                                            <li>{item.title} - {item.artist.name} - Price: <span className='price'>$ 5</span> <button onClick={() => this.removeHandler(item._id)} className='remove ml-3'>remove</button></li>
                                        ))
                                    }

                                    {/* <li>Album Title 2 - Artist - Price: <span className='price'>$ 5</span> <span className='remove ml-3'>remove</span></li>
                                    <li>Album Title 3 - Artist - Price: <span className='price'>$ 5</span> <span className='remove ml-3'>remove</span></li>
                                    <li className='total'>Total: $ 15</li> */}
                                </ul>
                                <a className='checkout' href='/cart'>Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;
