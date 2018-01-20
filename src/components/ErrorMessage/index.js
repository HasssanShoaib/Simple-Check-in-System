import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class ErrorMessage extends PureComponent {

  render() {
  	const { message, onDismiss } = this.props;
    return (
      <div 
	      onClick={onDismiss} 
	      className="error-container"
      >
      	<span className="error-message">{message}</span>
      	<button className="btn-dismiss">X</button>
      </div>
    );
  }
}

ErrorMessage.propTypes = {
	message: PropTypes.string,
	onDismiss: PropTypes.func
}

ErrorMessage.defaultProps = {
	onDismiss: () => null
}

export default ErrorMessage;