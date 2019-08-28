import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import './admin.css'
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class Admin extends Component {

    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            artist: '',
            title: '',
            genre: '',
            songs: [],
            image: '',
        }

        // initialize validation messages
        this.validator = new SimpleReactValidator({
            messages: {
                default: 'This field is required.'
            },
        });

    }

    addAlbumHandler(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            const album = {
                artist: this.state.artist,
                title: this.state.title,
                genre: this.state.genre,
                songs: this.state.songs,
                image: this.state.image,
            }
            axios.post('/api/user/album', album).then(response => {
                console.log(response)
                if (response.data.status === 200) {
                    console.log(response.data.message);
                    this.setState({
                        artist: '',
                        title: '',
                        genre: '',
                        songs: [],
                        image: '',
                    })
                } else {
                    console.log('Error Message')
                }
            }, error => {
                console.log(error)
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    songHandler(e, i) {
        let oldList = this.state.songs;
        oldList[i] = e.target.value;
        this.setState({
            songs: oldList
        })
    }

    imageHandler(e) {
        if (e.target.files[0] != null) {
            let inputValue = e.target;
            var file = inputValue.files[0];
            var myReader = new FileReader();

            myReader.onloadend = (e) => {
                this.setState({
                    image: (myReader.result).toString()
                })
            }
            myReader.readAsDataURL(file);
        }
    }
    render() {
        return (
            <div className='admin_page pt-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 form_container'>
                            <h2 className='text-center'>Add Item</h2>
                            <Form onSubmit={this.addAlbumHandler.bind(this)} noValidate>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Artist Name</Form.Label>
                                    <input type="text" name="artist" className='form-control' placeholder="Artist Name" required value={this.state.artist} onChange={(e) => { this.setState({ artist: e.target.value }) }} />
                                    {this.validator.message('artist', this.state.artist, 'required|alpha')}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Album</Form.Label>
                                    <input type="text" name="title" className='form-control' placeholder="Album Title" required value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                    {this.validator.message('title', this.state.title, 'required|alpha')}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control as="select" value={this.state.genre} onChange={(e) => { this.setState({ genre: e.target.value }) }}>
                                        <option value=''>Select Genere</option>
                                        <option value='rock'>Rock</option>
                                        <option value='pop'>Pop</option>
                                        <option value='electronic'>Electronic</option>
                                        <option value='hip-hop'>Hip-Hop</option>
                                    </Form.Control>
                                    {this.validator.message('genre', this.state.genre, 'required|alpha')}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Thumb Image</Form.Label>
                                    <input type="file" name="image" accept="image/*" className='form-control p-1' placeholder="Thumb Image" required onChange={(e) => { this.imageHandler(e) }} />
                                    {this.validator.message('image', this.state.image, 'required')}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Tracklist</Form.Label>
                                    <input type="text" name="track1" value={this.state.songs} className='form-control' placeholder="Track 1" required onChange={(e) => { this.songHandler(e, 0) }} />
                                    {/* {this.validator.message('song', this.state.song[0], 'required|alpha')} */}
                                    <input type="text" name="track2" value={this.state.songs} className='form-control' placeholder="Track 2" required onChange={(e) => { this.songHandler(e, 1) }} />
                                    {/* {this.validator.message('song', this.state.song[1], 'required|alpha')} */}
                                    <input type="text" name="track3" value={this.state.songs} className='form-control' placeholder="Track 3" required onChange={(e) => { this.songHandler(e, 2) }} />
                                    {/* {this.validator.message('song', this.state.song[2], 'required|alpha')} */}

                                    {/* <Form.Control type="text" className='mb-2' placeholder="Track 1" />
                                    <Form.Control type="text" className='mb-2' placeholder="Track 2" />
                                    <Form.Control type="text" className='mb-2' placeholder="Track 3" /> */}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <button className='btn btn-secondary btn-block' type="submit">Add</button>
                                </Form.Group>

                            </Form>
                        </div>
                        <div className='col-md-6 col-xs-12 activity'>
                            <h2 className='text-center'>Users Activities</h2>
                            <div className='col-12 filter'>
                                <h5>Filter by User:</h5>
                                <InputGroup className="mb-3">
                                    <FormControl aria-describedby="basic-addon1" placeholder='username' />
                                    <InputGroup.Prepend>
                                        <Button className='btn btn-secondary'>Filter</Button>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                <div className='activity_container'>
                                    <ul className='p-0'>
                                        <li>User A Purchased X, Y</li>
                                        <li>User A liked Artist Z</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
