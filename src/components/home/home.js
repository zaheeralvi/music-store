import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './home.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
class Home extends Component {

    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            fullData: [],
            data: []
        }

        this.getAlbums();

    }

    getAlbums() {
        axios.get('/api/albums').then(response => {
            console.log(response)
            if (response.status === 200) {
                // let newData = response.data;
                // let artistId={
                //     id: ''
                // };
                // for (let i = 0; i < newData.length; i++) {
                //     newData[i].artist = newData[i].artist.name
                //     artistId.id=newData[i].artist._id;
                //     newData[i]={...newData[i],artistId}
                // }
                this.setState({
                    fullData: response.data,
                    data: response.data,
                    isloaded: false
                })
                console.log(this.state.fullData)
            } else {
                console.log('Error Message')
            }
        }, error => {
            console.log(error)
        })
    }

    FilterList(genre) {
        console.log(genre)
    }

    getArtistName(artist) {
        console.log(artist);
    }

    render() {
        var { isloaded, fullData, data } = this.state;
        return (
            <div className="home_page">
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-3 sidebar pt-5'>
                            <h4 className='title'>Genre</h4>
                            <ul className='genre_list'>
                                <li><span onClick='() => this.FilterList.bind("rock")'>Rock</span></li>
                                <li><span onClick='() => this.FilterList.bind("pop")'>Pop</span></li>
                                <li><span onClick='() => this.FilterList.bind("electronic")'>Electronic</span></li>
                                <li><span onClick='() => this.FilterList.bind("hip-hop")'>Hip-Hop</span></li>
                            </ul>
                        </div>
                        <div className='col-sm-9 main_content pt-5'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='filter col-md-4 col-xs-12 float-right p-0'>
                                        <InputGroup className="mb-3">
                                            <FormControl aria-describedby="basic-addon1" />
                                            <InputGroup.Prepend>
                                                <Button className='btn btn-secondary'>Search</Button>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </div>
                                </div>

                                {
                                    data.map(album => (
                                        <div className='col-md-4 col-sm-4 col-xs-6 mb-4'>
                                            <Card>
                                                <NavLink to={'/album/' + album._id}>
                                                    <Card.Img height='200px' variant="top" src={album.image} />
                                                </NavLink>
                                                <Card.Body>
                                                    <Card.Title className='text-capitalize'>{album.title}</Card.Title>
                                                    <NavLink className='text-capitalize' to={'/artist/' + album.artist._id}>{album.artist.name}</NavLink>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))
                                }
                                {/* <div className='col-md-4 col-sm-4 col-xs-6 mb-4'>
                                    <Card>
                                        <Card.Img variant="top" src="https://via.placeholder.com/70" />
                                        <Card.Body>
                                            <Card.Title>Title</Card.Title>
                                            <NavLink to='/artist'>Artist</NavLink>
                                        </Card.Body>
                                    </Card>
                                </div> */}

                            </div>
                            <div>
                                <ul className="pager text-center mt-3">
                                    <li><span>Previous</span></li>
                                    <li><span>Next</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
