import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import './register.css';
class Register extends Component {

	constructor(props) {
		super(props);

		// initialize state
		this.state = {
			username: '',
			email: '',
			password: '',
		}

		// initialize validation messages
		this.validator = new SimpleReactValidator({
			messages: {
				email: 'Please enter correct email',
				default: 'This field is required.'
			},
		});

	}

	registerUser(e) {
		e.preventDefault();
		if (this.validator.allValid()) {
			const user = {
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
			}
			console.log(user)
			
			axios.post('/api/user', user).then(response => {
				if(response.status==200){
					
				}else{
					console.log('Error Message')
				}
			  },error=>{
				  console.log(error)
			  })
		} else {
			this.validator.showMessages();
			this.forceUpdate();
		}
	}

	render() {
		return (
			<div className="form_wrapper">
				<div className="form_container no_border">
					<div className="title_container">
						<h2>Register</h2>
					</div>
					<div className="row clearfix">
						<div className="col-12">
							<form onSubmit={this.registerUser.bind(this)} noValidate>
								<div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
									<input type="email" name="email" placeholder="Email" required onChange={(e) => { this.setState({ email: e.target.value }) }} />
								</div>
								{this.validator.message('email', this.state.email, 'required|email')}
								<div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
									<input type="text" name="username" placeholder="Username" required onChange={(e) => { this.setState({ username: e.target.value }) }} />
								</div>
								{this.validator.message('username', this.state.username, 'required|alpha')}
								<div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
									<input type="password" name="password" placeholder="Password" required onChange={(e) => { this.setState({ password: e.target.value }) }} />
								</div>
								{this.validator.message('password', this.state.password, 'required|alpha')}
								<input className="button" type="submit" value="Register" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Register;
