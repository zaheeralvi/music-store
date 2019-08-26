import React, { Component } from 'react';
import './register.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import SimpleReactValidator from 'simple-react-validator';

// all city data in array form here
const cityOptions = [
    { value: 'sialkot', label: 'Sialkot' },
    { value: 'lahore', label: 'Lahore' },
];

// all blood groups datais here
const bloodGroupOptions = [
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' }
];

class Register extends Component {
    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
            age: '',
            bloodGroup: '',
            city: '',
            confirmPassError: ''
        }

        // initialize validation messages
        this.validator = new SimpleReactValidator({
            messages: {
                email: 'Please enter correct email',
                min: 'Enter 6 characters must.',
                phone: 'The phone must be a valid phone number.',
                integer:'Enter Number only',
                alpha: 'Please Enter valid name',
                default: 'That field is required.'
            },
        });

    }

    componentDidMount(){
        // scroll top when page is open
        window.scrollTo(0, 0);
    }
    
    // check both input passwords are match or not
    handleConfirmPassword(e){
        this.state.confirmPassword = e.target.value;
        this.setState({confirmPassword: e.target.value});
        if (this.state.confirmPassword === this.state.password) {
            this.state.confirmPassError = null;
        }
    }

    // submit information handler
    registerUser(e){
        e.preventDefault();
        if (this.validator.allValid() && this.state.confirmPassword === this.state.password) {
            // if all fields are valid and both password are math then its works
            const user = {
                name: this.state.firstName +' '+this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                address: this.state.address,
                city: this.state.city,
                age: this.state.age,
                bloodGroup: this.state.bloodGroup
            }
            axios.post('/data/addUsers', user)
            .then(response => {
                if (response.data === 'registered successfully') { //if user data register sucessfully in backend then its works
                    alert('Congratulation: Register sucessfully.');
                    this.props.history.push('/'); //redirect to home page
                }else if(response.data = 'email already exists'){ //if email already exists then its works
                    alert('Email already exists.Try another email.');
                }
              })
        }else{
            // if all fields are invalid then its works
            this.validator.showMessages();
            this.forceUpdate();
        }

        if(this.state.confirmPassword != this.state.password){ // after form submit if passwords not match its works
            this.state.confirmPassError = <div className="srv-validation-message">Both Passwords not matchs.</div>
        }
    }

    render() {
        return (
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                    <h2>Register Account</h2>
                    </div>
                    <div className="clearfix">
                        <div className="">
                            <form onSubmit={this.registerUser.bind(this)}>
                                <div className="row clearfix">
                                    <div className="col_half">
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                            <input type="text" placeholder="First Name" onChange={(e) => {this.setState({firstName : e.target.value})}} />
                                            {this.validator.message('firstName', this.state.firstName, 'required|alpha')}
                                        </div>
                                    </div>
                                    <div className="col_half">
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                            <input type="text" placeholder="Last Name" onChange={(e) => {this.setState({lastName : e.target.value})}} />
                                            {this.validator.message('lastName', this.state.lastName, 'required|alpha')}
                                        </div>
                                    </div>
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                    <input type="email" name="email" placeholder="Email" onChange={(e) => {this.setState({email : e.target.value})}} />
                                    {this.validator.message('email', this.state.email, 'required|email')}
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                    <input type="password" name="password" placeholder="Password" onChange={(e) => {this.setState({password : e.target.value})}} />
                                    {this.validator.message('password', this.state.password, 'required|min:6')}
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                    <input type="password" name="confirmPassword" placeholder="Re-type Password"  onChange={this.handleConfirmPassword.bind(this)}/>
                                    {this.state.confirmPassError}
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-phone"></i></span>
                                    <input type="text" name="phone" placeholder="Enter Your Phone Number" onChange={(e) => {this.setState({phone : e.target.value})}} />
                                    {this.validator.message('phone', this.state.phone, 'required|phone')}
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-home"></i></span>
                                    <input type="text" name="address" placeholder="Enter Your Adress" onChange={(e) => {this.setState({address : e.target.value})}} />
                                    {this.validator.message('address', this.state.address, 'required')}
                                </div>
                                <div className="input_field">
                                    <Select
                                        placeholder = 'Select Your City'
                                        onChange={(selectedOption) => {this.setState({city : selectedOption.value});}}
                                        options={cityOptions}
                                    />
                                    {this.validator.message('city', this.state.city, 'required')} 
                                </div>
                                <div className="input_field"><span><i aria-hidden="true" className="fa fa-user"></i></span>
                                    <input type="text" name="age" placeholder="Enter Your Age" onChange={(e) => {this.setState({age : e.target.value})}}/>
                                    {this.validator.message('age', this.state.age, 'required|integer')}                                    
                                </div>
                                <div className="input_field">
                                    <Select
                                        placeholder = 'Select Your Blood Group'
                                        onChange={(selectedOption) => {this.setState({bloodGroup : selectedOption.value});}}
                                        options={bloodGroupOptions}
                                    />
                                    {this.validator.message('bloodGroup', this.state.bloodGroup, 'required')} 
                                </div>
                                <input className="button" type="submit" value="Register" />
                            </form>
                        </div>
                    </div>
                    <p>Have Account? &nbsp;-> &nbsp; &nbsp;<NavLink to='/login'><strong>Login Here</strong></NavLink></p>
                </div>
            </div>
        )    
    }
    
}

export default Register;
