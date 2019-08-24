import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import './home.css'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
class Home extends Component {

    render() {
        return (
            <div className="home_page">
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-3 sidebar pt-5'>
                            <h4 className='title'>Genre</h4>
                            <ul className='genre_list'>
                                <li><a href="#">Rock</a></li>
                                <li><a href="#">Pop</a></li>
                                <li><a href="#">Electronic</a></li>
                                <li><a href="#">Hip-Hop</a></li>
                            </ul>
                        </div>
                        <div className='col-sm-9 main_content pt-5'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='filter col-4 float-right'>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <Button className='btn btn-secondary'>Search</Button>
                                            </InputGroup.Prepend>
                                            <FormControl aria-describedby="basic-addon1" />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-4 col-xs-6 mb-4'>
                                    <Card>
                                        <Card.Img variant="top" src="https://via.placeholder.com/70" />
                                        <Card.Body>
                                            <Card.Title>Title</Card.Title>
                                            <a href=''>Artist</a>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className='col-md-4 col-sm-4 col-xs-6 mb-4'>
                                    <Card>
                                        <Card.Img variant="top" src="https://via.placeholder.com/70" />
                                        <Card.Body>
                                            <Card.Title>Title</Card.Title>
                                            <a href=''>Artist</a>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className='col-md-4 col-sm-4 col-xs-6 mb-4'>
                                    <Card>
                                        <Card.Img variant="top" src="https://via.placeholder.com/70" />
                                        <Card.Body>
                                            <Card.Title>Title</Card.Title>
                                            <a href=''>Artist</a>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className='col-md-4 col-sm-4 col-xs-6 mb-4'>
                                    <Card>
                                        <Card.Img variant="top" src="https://via.placeholder.com/70" />
                                        <Card.Body>
                                            <Card.Title>Title</Card.Title>
                                            <a href=''>Artist</a>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className='col-md-4 col-sm-4 col-xs-6 mb-4'>
                                    <Card>
                                        <Card.Img variant="top" src="https://via.placeholder.com/70" />
                                        <Card.Body>
                                            <Card.Title>Title</Card.Title>
                                            <a href=''>Artist</a>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className='col-md-4 col-sm-4 col-xs-6 mb-4'>
                                    <Card>
                                        <Card.Img variant="top" src="https://via.placeholder.com/70" />
                                        <Card.Body>
                                            <Card.Title>Title</Card.Title>
                                            <a href=''>Artist</a>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                            <div>
                                <ul class="pager text-center mt-3">
                                    <li><a href="#">Previous</a></li>
                                    <li><a href="#">Next</a></li>
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
