import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './artist.css'
class Artist extends Component {
    render() {
        return (
            <div className='artist_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 pt-5'>
                            <NavLink to='/' className='back mb-3'>Back</NavLink>
                            <h3 className='Title'>Artist name <span className='btn_follow float-right'>follow</span></h3>
                            <div className='albums pt-4'>
                                <h6>Albums:</h6>
                            </div>
                            <ul className='list-unstyled'>
                                <li>Album 1</li>
                                <li>Album 2</li>
                                <li>Album 3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Artist;
