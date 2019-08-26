import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './cart.css'
class Cart extends Component {
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
