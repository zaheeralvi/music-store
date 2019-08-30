import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

	notify = (msg) => toast(msg);

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
				console.log(response)
				if (response.data.status === 200) {
					localStorage.setItem('loggedUser', 'true');
					localStorage.setItem('userID', response.data.inserteduser._id);
					localStorage.setItem('username', response.data.inserteduser.username);
					localStorage.setItem('userRole', response.data.inserteduser.role);
					this.notify(response.data.message)
					this.props.history.push('/');
				} else if (response.data.status === 422) {
					this.notify(response.data.message)
					// console.log('Email Already Exist')
				}
			}, error => {
				console.log(error)
			})
		} else {
			this.validator.showMessages();
			this.forceUpdate();
		}
	}

	render() {
		return (
			<div>
				<ToastContainer />
				<div className="form_wrapper">
					<div className="form_container no_border">
						<div className="title_container">
							<h2>Register</h2>
						</div>
						<div className="row clearfix">
							<div className="col-12">
								<form onSubmit={this.registerUser.bind(this)} noValidate>
									<div className="input_field"><span className='fa pt-1'><FontAwesomeIcon icon={faEnvelope} /></span>
										<input type="email" name="email" placeholder="Email" required onChange={(e) => { this.setState({ email: e.target.value }) }} />
									</div>
									{this.validator.message('email', this.state.email, 'required|email')}
									<div className="input_field"><span className='fa pt-1'><FontAwesomeIcon icon={faUser} /></span>
										<input type="text" name="username" placeholder="Username" required onChange={(e) => { this.setState({ username: e.target.value }) }} />
									</div>
									{this.validator.message('username', this.state.username, 'required')}
									<div className="input_field"><span className='fa pt-1'><FontAwesomeIcon icon={faLock} /></span>
										<input type="password" name="password" placeholder="Password" required onChange={(e) => { this.setState({ password: e.target.value }) }} />
									</div>
									{this.validator.message('password', this.state.password, 'required')}
									<input className="button" type="submit" value="Register" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Register;
