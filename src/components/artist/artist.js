import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './artist.css'
class Artist extends Component {
    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            artist: [],
            name: ''
        }

        this.getArtistData();
    }

    getArtistData() {
        let id = this.props.match.params.id;
        axios.get('/api/artist/' + id).then(response => {
            // console.log(response)
            if (response.status === 200) {
                this.setState({
                    artist: response.data,
                    name: response.data[0].artist.name
                })
                // console.log(this.state.artist)
                // console.log(this.state.name)
            } else {
                console.log('Error Message')
            }
        }, error => {
            console.log(error)
        })
    }
    render() {
        var { name, artist } = this.state;
        return (
            <div className='artist_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 pt-5'>
                            <NavLink to='/' className='back mb-3'>Back</NavLink>
                            <h3 className='Title text-capitalize'>{name} {/*<span className='btn_follow float-right'>follow</span>*/}</h3>
                            <div className='albums pt-4'>
                                <h6>Albums:</h6>
                            </div>
                            <ul className='list-unstyled'>
                                {
                                    artist.map(album => (
                                        <li className='text-capitalize'>{album.title}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Artist;
