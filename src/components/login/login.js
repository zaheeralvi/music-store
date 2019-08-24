import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import './login.css';
class Login extends Component {

	render() {
		return (
			<div className="form_wrapper">
				<div className="form_container">
					<div className="title_container">
						<h2>Login</h2>
					</div>
					<div className="row clearfix">
						<div className="col-12">
							<form>
								<div className="input_field"> <span><i aria-hidden="true" className="glyphicon glyphicon-user"></i></span>
									<input type="email" name="email" placeholder="Email" required />
								</div>
								<div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
									<input type="password" name="password" placeholder="Password" required />
								</div>
								<input className="button" type="submit" value="Login" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;
