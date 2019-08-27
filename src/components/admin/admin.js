import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import './admin.css'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class Admin extends Component {
    render() {
        return (
            <div className='admin_page pt-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-xs-12 form_container'>
                            <h2 className='text-center'>Add Item</h2>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Artist Name</Form.Label>
                                    <Form.Control type="text" placeholder="Artist Name" />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Album</Form.Label>
                                    <Form.Control type="text" placeholder="Album" />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control as="select">
                                        <option value='' disabled>Select Genere</option>
                                        <option value='rock'>Rock</option>
                                        <option value='pop'>Pop</option>
                                        <option value='electronic'>Electronic</option>
                                        <option value='hip-hop'>Hip-Hop</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Thumb Image</Form.Label>
                                    <Form.Control type="file" className='form-control p-1' accept='images/*' placeholder="Thumb Image" />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Tracklist</Form.Label>
                                    <Form.Control type="text" className='mb-2' placeholder="Track 1" />
                                    <Form.Control type="text" className='mb-2' placeholder="Track 2" />
                                    <Form.Control type="text" className='mb-2' placeholder="Track 3" />
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
