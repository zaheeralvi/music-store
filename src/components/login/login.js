import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import './login.css';
class Register extends Component {

	constructor(props) {
		super(props);

		// initialize state
		this.state = {
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

	loginHandler(e) {
		e.preventDefault();
		if (this.validator.allValid()) {
			const user = {
				email: this.state.email,
				password: this.state.password,
			}
			console.log(user)
			
			axios.post('/api/user/login', user).then(response => {
				console.log(response)
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
						<h2>Login</h2>
					</div>
					<div className="row clearfix">
						<div className="col-12">
							<form onSubmit={this.loginHandler.bind(this)} noValidate>
								<div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
									<input type="email" name="email" placeholder="Email" required onChange={(e) => { this.setState({ email: e.target.value }) }} />
								</div>
								{this.validator.message('email', this.state.email, 'required|email')}
								<div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
									<input type="password" name="password" placeholder="Password" required onChange={(e) => { this.setState({ password: e.target.value }) }} />
								</div>
								{this.validator.message('password', this.state.password, 'required|alpha')}
								<input className="button" type="submit" value="Login" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Register;
