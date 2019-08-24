import React, { Component } from 'react';
import './album.css'
class Album extends Component {
    render() {
        return (
            <div className='artist_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 pt-5'>
                            <a href="#" className='back mb-3'>Back</a>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <img src='https://via.placeholder.com/150' className='img-responsive' />
                                </div>
                                <div className='col-sm-8'>
                                    <h5 className='title'>Title</h5>
                                    <p className='artist'>Artist</p>
                                    <p className='genre'>Genre</p>
                                </div>
                            </div>
                            <div className='albums pt-4'>
                                <h6>Tracklist:</h6>
                                <ul className='list-unstyled'>
                                    <li>1. Song a</li>
                                    <li>2. Song b</li>
                                    <li>3. Song c</li>
                                </ul>
                                <a className='add_to_cart' href="#">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Album;
