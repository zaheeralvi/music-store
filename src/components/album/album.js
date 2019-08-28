import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './album.css'

class Album extends Component {
    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            album: '',
            songs: [],
            artist: ''
        }

        this.getAlbumData();
    }

    getAlbumData() {
        let id = this.props.match.params.id;
        axios.get('/api/album/' + id).then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({
                    album: response.data,
                    songs: response.data.songs,
                    artist: response.data.artist.name
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
        var { album, songs,artist } = this.state;
        return (
            <div className='artist_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 pt-5'>
                            <NavLink to='/' className='back mb-3'>Back</NavLink>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <img height='150px' width='150px' src={album.image} alt='thumb' className='img-responsive' />
                                </div>
                                <div className='col-sm-8'>
                                    <h5 className='title text-capitalize'>{album.title}</h5>
                                    <p className='artist text-capitalize'>{artist}</p>
                                    <p className='genre text-capitalize'>{album.genre}</p>
                                </div>
                            </div>
                            <div className='albums pt-4'>
                                <h6>Tracklist:</h6>
                                <ol className='pl-4'>
                                    {
                                        songs.map(song => (
                                            <li className='text-capitalize'>{song}</li>
                                        ))
                                    }
                                    {/* <li>2. Song b</li>
                                    <li>3. Song c</li> */}
                                </ol>
                                <a className='add_to_cart' href="/cart">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Album;
