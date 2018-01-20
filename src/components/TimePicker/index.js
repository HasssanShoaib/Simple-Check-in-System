import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TimeBox from './TimeBox';
import { convertTo12Hours } from '../../helpers/converter';
import './styles.css';

class TimePicker extends PureComponent {

	constructor(props) {
		super(props);
	  this.hourRange = this.generateRange(props.minHours, props.maxHours, props.hourStep);
	  this.minuteRange = this.generateRange(0, 59, props.minuteStep);
	}

	handleChange = (selectedTime) => {
		this.props.onChange(selectedTime);
	}

	displayHours = (selectedTime, format) => {
		if (format === 'ampm') {
			const hours12 = convertTo12Hours(selectedTime.hours);
			const { hours, ampm } = hours12;
			return hours + ampm;
		} else if (format === '24hr') {
			return selectedTime.hours;
		}
	}

	displayMinutes = (selectedTime, format) => {
		const minutes = ("0" + selectedTime.minutes).slice(-2);

		if (format === 'ampm') {
			const hours12 = convertTo12Hours(selectedTime.hours);
			const { hours, ampm } = hours12;
			return `${hours}:${minutes}${ampm}`;
		} else if (format === '24hr') {
			return `${selectedTime.hours}:${minutes}`;
		}
	}

	generateRange = (min, max, step) => {
		let range = [];
		for(let i = min; i <= max; i += step){
			range.push(i);
		}
		return range;
	}

	renderHours = () => {
		const { format, selectedTime } = this.props;
		return this.hourRange.map((hours) => {
			return (
				<TimeBox
					key={hours}
					value={{hours}}
					displayValue={this.displayHours({hours}, format)}
					isSelected={selectedTime.hours === hours}
					onClick={this.handleChange}
				/>
			)	
		});
	}

	renderMinutes = () => {
		const { format, selectedTime } = this.props;
		return this.minuteRange.map((minutes) => {
			const time = { hours: selectedTime.hours, minutes }
			return (
				<TimeBox
					key={minutes}
					value={{minutes}}
					displayValue={this.displayMinutes(time, format)}
					isSelected={selectedTime.minutes === minutes}
					onClick={this.handleChange}
				/>
			)	
		});
	}

  render() {
    return (
    	<div className="time-group">
	    	<div className="hour-group">
	    		{ this.renderHours() }
	    	</div>
	      <div className="minute-group">
	    		{ this.renderMinutes() }
	    	</div>
      </div>
    );
  }
}

TimePicker.propTypes = {
	format: PropTypes.oneOf(['ampm', '24hr']),
	hourStep: PropTypes.number,
	minuteStep: PropTypes.number,
	selectedTime: PropTypes.object,
	minHours: PropTypes.number,
	maxHours: PropTypes.number,
	onChange: PropTypes.func
}

TimePicker.defaultProps = {
	format: "ampm",
	hourStep: 1,
	minuteStep: 15,
	minHours: 1,
	maxHours: 23,
	onChange: () => null
}

export default TimePicker;