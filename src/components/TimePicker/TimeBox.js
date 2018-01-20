import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './TimeBox.css';

class TimeBox extends PureComponent {

	handleClick = () => {
		const { value, onClick } = this.props;
		onClick(value);
	}

  render() {
  	const { isSelected, displayValue } = this.props;
    const selected = isSelected ? 'selected' : '';
		return (
			<div 
				className={`time-box ${selected}`}
				onClick={this.handleClick}
			>
				{ displayValue }
			</div>
		)
  }
}

TimeBox.propTypes = {
	value: PropTypes.object,
	displayValue: PropTypes.string,
	isSelected: PropTypes.bool,
	onClick: PropTypes.func				
}

TimeBox.defaultProps = {
	displayValue: "",
	isSelected: false,
	onClick: () => null
}

export default TimeBox;