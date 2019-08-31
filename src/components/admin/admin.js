import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import './admin.css'
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
// import FormControl from 'react-bootstrap/FormControl'
import Spinner from 'react-bootstrap/Spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Admin extends Component {

    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            artist: '',
            title: '',
            genre: '',
            price: '',
            songs: [],
            song: '',
            image: '',
            allActivities: [],
            data: [],
            loading: true
        }

        // initialize validation messages
        this.validator = new SimpleReactValidator({
            messages: {
                default: 'This field is required.'
            },
        });

        if (localStorage.getItem('userRole') !== 'admin') {
            console.log('You are not Allow to visit this page');
            this.props.history.push('/')
        }
        this.getActivities();

    }

    notify = (msg) => toast(msg);

    getActivities() {
        // let id=localStorage.getItem('userID');
        axios.get('/api/checkout').then(response => {
            console.log(response)
            if (response.data.status === 200) {
                this.setState({
                    allActivities: response.data.data,
                    data: response.data.data,
                    loading: false
                })
            }
            console.log(this.state.data)
        })
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
                price: this.state.price,
            }
            axios.post('/api/album', album).then(response => {
                console.log(response)
                if (response.data.status === 200) {
                    // console.log(response.data.message);
                    this.notify(response.data.message)
                    // this.setState({
                    //     artist: '',
                    //     title: '',
                    //     price: Number,
                    // })
                    document.getElementById("albumForm").reset();
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
        if(i===0){
            this.setState({
                song: e.target.value
            })
        }
        this.setState({
            songs: oldList
        })
    }

    imageHandler(e) {
        if (e.target.files[0] != null) {
            let inputValue = e.target;
            if ((inputValue.files[0].size) / 1000 > 1000) {
                console.log('File Size is Too Large')
            }
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

    FilterByName(user) {
        user = user.toLowerCase();
        let data = [];
        let newdata = [];
        data = [...data, this.state.allActivities];
        newdata = data[0].filter(d => d.username.toLowerCase().includes(user))
        this.setState({
            data: newdata
        })
    }
    render() {
        var { data } = this.state;
        return (
            <div className='admin_page pt-5'>
                <ToastContainer />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 form_container'>
                            <h2 className='text-center'>Add Item</h2>
                            <Form onSubmit={this.addAlbumHandler.bind(this)} id='albumForm' noValidate>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Artist Name</Form.Label>
                                    <input type="text" name="artist" className='form-control' placeholder="Artist Name" required onChange={(e) => { this.setState({ artist: e.target.value }) }} />
                                    {this.validator.message('artist', this.state.artist, 'required')}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Album</Form.Label>
                                    <input type="text" name="title" className='form-control' placeholder="Album Title" required onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                    {this.validator.message('title', this.state.title, 'required')}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Price</Form.Label>
                                    <input type="number" name="price" className='form-control' placeholder="Album Price" required onChange={(e) => { this.setState({ price: e.target.value }) }} />
                                    {this.validator.message('price', this.state.price, 'required')}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control as="select" onChange={(e) => { this.setState({ genre: e.target.value }) }}>
                                        <option value=''>Select Genere</option>
                                        <option value='rock'>Rock</option>
                                        <option value='pop'>Pop</option>
                                        <option value='electronic'>Electronic</option>
                                        <option value='hip-hop'>Hip-Hop</option>
                                    </Form.Control>
                                    {this.validator.message('genre', this.state.genre, 'required')}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Thumb Image</Form.Label>
                                    <input type="file" name="image" accept="image/*" className='form-control p-1' placeholder="Thumb Image" required onChange={(e) => { this.imageHandler(e) }} />
                                    {this.validator.message('image', this.state.image, 'required')}
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Tracklist</Form.Label>
                                    <input type="text" name="track1" className='form-control' placeholder="Track 1" required onChange={(e) => { this.songHandler(e, 0) }} />
                                    {this.validator.message('song', this.state.song, 'required')}
                                    <p className='mb-2'></p>
                                    <input type="text" name="track2" className='form-control mb-2' placeholder="Track 2" required onChange={(e) => { this.songHandler(e, 1) }} />
                                    {/* {this.validator.message('song', this.state.song[1], 'required')} */}
                                    <input type="text" name="track3" className='form-control mb-2' placeholder="Track 3" required onChange={(e) => { this.songHandler(e, 2) }} />
                                    {/* {this.validator.message('song', this.state.song[2], 'required')} */}

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
                                    {/* <FormControl aria-describedby="basic-addon1" placeholder='username' /> */}
                                    <input type='text' className='form-control' onChange={(e) => this.FilterByName(e.target.value)} />
                                    <InputGroup.Prepend>
                                        <Button className='btn btn-secondary'>Filter</Button>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                <div className='activity_container'>
                                    <ul className='p-0'>
                                        {
                                            data.map(item => (
                                                <li>
                                                    User {item.username} ordered
                                                    {item.album.map((alb) =>
                                                        <span className='album_title'> {alb} </span>
                                                    )}
                                                </li>
                                            ))
                                        }
                                        {
                                            this.state.loading ? <Spinner animation="grow" /> : null
                                        }
                                        {
                                            data.length === 0 ? 'No Data Found' : null
                                        }
                                        {/* <li>User A liked Artist Z</li> */}
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
