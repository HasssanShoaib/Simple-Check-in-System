import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Button extends PureComponent {

	handleClick = () => {
		this.props.onClick();
	}

  render() {
  	const { value, variant, disabled } = this.props;
    return (
      <button 
	      onClick={this.handleClick} 
	      className={`btn btn-${variant}`}
	      disabled={disabled}
      >
      	{ value }
      </button>
    );
  }
}

Button.propTypes = {
	value: PropTypes.string,
	onClick: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'danger']),
	disabled: PropTypes.bool
}

Button.defaultProps = {
	value: "",
	onClick: () => null
}

export default Button;