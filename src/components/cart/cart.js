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
        }

        this.getCartData();
    }


    getCartData() {
        let id = 'example_user_idfd';
        axios.get('/api/cart/' + id).then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({
                    cart: response.data,
                })
            } else {
                console.log('Error Message')
            }
        }, error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className='artist_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 pt-5'>
                            <NavLink to='/' className='back mb-3'>Back</NavLink>

                            <div className='albums'>
                                <ul className='list-unstyled'>
                                    <li>Album Title 1 - Artist - Price: <span className='price'>$ 5</span> <span className='remove ml-3'>remove</span></li>
                                    <li>Album Title 2 - Artist - Price: <span className='price'>$ 5</span> <span className='remove ml-3'>remove</span></li>
                                    <li>Album Title 3 - Artist - Price: <span className='price'>$ 5</span> <span className='remove ml-3'>remove</span></li>
                                    <li className='total'>Total: $ 15</li>
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
