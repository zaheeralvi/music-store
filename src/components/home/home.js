import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './home.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Pagination from "react-js-pagination";

class Home extends Component {

    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            fullData: [],
            data: [],
            genreList: ['rock', 'pop', 'electronic', 'hip-hop'],
            activePage: 1,
            length: 1,
        }

        this.getAlbums();

    }

    getAlbums() {
        axios.get('/api/albums').then(response => {
            console.log(response)
            if (response.status === 200) {
                let limit = response.data.filter((item, index) => {
                    return response.data.indexOf(item) < 9
                })
                this.setState({
                    fullData: response.data,
                    data: limit,
                    length: response.data.length
                })
                console.log(this.state.fullData)
            } else {
                console.log('Error Message')
            }
        }, error => {
            console.log(error)
        })
        console.log(this.state.fullData)
        console.log(this.state.data)
        console.log(this.state.length)
    }

    FilterList(genre) {
        // console.log(genre);
        let data = [];
        let newdata = [];
        data = [...data, this.state.fullData];
        // console.log(data)
        newdata = data[0].filter(d => d.genre === genre)
        this.setState({
            data: newdata
        })
        // console.log(this.state.data)
    }

    FilterByName(val) {
        // console.log(val);
        let data = [];
        let newdata = [];
        data = [...data, this.state.fullData];
        newdata = data[0].filter(d => d.title.includes(val))
        this.setState({
            data: newdata
        })
    }

    handlePageChange(pageNumber) {
        // let offset = pageNumber * 9;
        // data
        console.log(`active page is ${pageNumber}`);
        this.setState({
            activePage: pageNumber
        })

    }


    render() {
        var { genreList, data } = this.state;
        return (
            <div className="home_page">
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-3 sidebar pt-5'>
                            <h4 className='title'>Genre</h4>
                            <ul className='genre_list'>
                                {
                                    genreList.map(genre => (
                                        <li><button className='btn text-capitalize' onClick={() => this.FilterList(genre)}>{genre}</button></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='col-sm-9 main_content pt-5'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='filter col-md-4 col-xs-12 float-right p-0'>
                                        <InputGroup className="mb-3">
                                            {/* <FormControl aria-describedby="basic-addon1" /> */}
                                            <input type='text' className='form-control' placeholder='Filter by Album Name' onChange={(e) => this.FilterByName(e.target.value)} />
                                            <InputGroup.Prepend>
                                                <Button className='btn btn-secondary'>Search</Button>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </div>
                                </div>

                                {
                                    data.map(album => (
                                        <div className='col-md-4 col-sm-5 col-xs-6 mb-4'>
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
                                {
                                    data.length === 0 ? <div className='col-12 text-center'><h5>No Data Found</h5></div> : null
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
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={9}
                                    totalItemsCount={this.state.length}
                                    pageRangeDisplayed={2}
                                    onChange={this.handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
