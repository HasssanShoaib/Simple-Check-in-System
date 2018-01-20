import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ErrorMessage from '../../components/ErrorMessage';
import Routes from '../../Routes';
import * as actionCreators from '../../redux/modules/errorMessage';
import './styles.css';

class App extends Component {
  render() {
	  const { error, dismissError } = this.props;
    return (
	    <div className="app">
	      <Routes />
	      {
	      	error &&
	      		<ErrorMessage 
	      			message={error.message}
	      			onDismiss={dismissError}
	      		/>
	      }
	    </div>
    );
  }
}

App.propTypes = {
	error: PropTypes.object
}

const mapStateToProps = ({errorMessage}) => {
	const error = errorMessage ? errorMessage.error : null;
	return { error }
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
