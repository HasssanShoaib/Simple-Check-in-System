import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FAMLY_API_PASSWORD } from '../../constants/authentication';
import Button from '../../components/Button';
import * as actionCreators from '../../redux/modules/auth';
import { checkIfLogged } from '../../redux/modules/auth';

class Login extends PureComponent {

	handleLogin = () => {
		this.props.login(FAMLY_API_PASSWORD);
	}

	handleLogout = () => {
		this.props.logout();
	}

  render() {
  	const { loggingIn, isLoggedIn } = this.props;
  	const loginBtn = loggingIn ? 'Logging in...' : 'Login';
    return (
      <div className="screen-center">
      	{ isLoggedIn 
	      		? <Redirect to="childGroup" />
		      	: <Button
			        	value={loginBtn}
			        	variant="success"
			        	disabled={loggingIn}
			        	onClick={this.handleLogin}
		      		/>
	      }
      </div>
    );
  }
}

Login.propTypes = {
	isLoggedIn: PropTypes.bool,
	loggingIn: PropTypes.bool
}

const mapStateToProps = ({auth}) => {
	return {
		isLoggedIn: checkIfLogged(auth),
		loggingIn: auth.loggingIn
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
