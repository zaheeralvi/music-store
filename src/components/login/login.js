import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
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
				if(response.status===200){
					localStorage.setItem('loggedUser','true');
					localStorage.setItem('userID',response.data.user[0]._id);
					console.log(response.data.user[0]._id)
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
								<div className="input_field"><span className='fa pt-1'><FontAwesomeIcon icon={faEnvelope} /></span>
									<input type="email" name="email" placeholder="Email" required onChange={(e) => { this.setState({ email: e.target.value }) }} />
								</div>
								{this.validator.message('email', this.state.email, 'required|email')}
								<div className="input_field"><span className='fa pt-1'><FontAwesomeIcon icon={faLock} /></span>
									<input type="password" name="password" placeholder="Password" required onChange={(e) => { this.setState({ password: e.target.value }) }} />
								</div>
								{this.validator.message('password', this.state.password, 'required')}
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
