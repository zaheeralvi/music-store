import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './album.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    notify = (msg) => toast(msg);

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

    AddToCart(id) {
        let userId = localStorage.getItem('userID')
        if ((userId !== '') && (userId !== undefined) && (userId != null)) {
            let data = {
                album: id,
                album_id: id._id,
                user: localStorage.getItem('userID')
            }
            axios.post('/api/cart', data).then(response => {
                console.log(response)
                if (response.status === 200) {
                        this.notify('Album Add to Cart Successfully')
                    // console.log("Album Add to Cart Successfully")
                } else {
                    console.log('Error Message')
                }
            }, error => {
                // console.log(error)
            })
        } else {
            this.props.history.push('/login');
        }
    }

    deleteAlbum(id){
        axios.delete('/api/album/delete/'+id).then(response => {
            console.log(response)
            if (response.data.status === 200) {
                    this.notify('Album Deleted Successfully')
                    this.props.history.push('/')
                } else {
                console.log('Error Message')
            }
        }, error => {
            // console.log(error)
        })
    }

    render() {
        var { album, songs, artist } = this.state;
        return (
            <div className='artist_page'>
                <ToastContainer />
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
                                <h6>Price: <strong>{album.price}</strong></h6>
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
                                <button className='add_to_cart mb-2' onClick={() => this.AddToCart(album)} >Add to Cart</button><br/>
                                {
                                    localStorage.getItem('userRole') === 'admin' ?
                                    <button className='delete btn btn-danger' onClick={() => this.deleteAlbum(album._id)} >Delete Album</button>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Album;
