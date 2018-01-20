import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import TimePicker from '../../components/TimePicker';
import { convertTo12Hours } from '../../helpers/converter';
import './childSignin.css';

class ChildSignin extends PureComponent {

  displayTime = () => {
    const { pickupTime } = this.props;
    if (!pickupTime) {
      return "";
    }

    const minutes = ("0" + pickupTime.minutes).slice(-2);
    const hours12 = convertTo12Hours(pickupTime.hours);
    const { hours, ampm } = hours12;
    return `${hours}:${minutes}${ampm}`;
  }

  render() {
  	const { checkinChild, changePickupTime, selectedChild,
     pickupTime, isCheckingIn } = this.props;
  	const { name } = selectedChild;
    const signInBtn = isCheckingIn ? 'Checking in...' : 'Sign in';

    return (
      <div className="page child-signin">
        <div className="time-wrapper">
          <h1 className="name-title">{name.firstName}</h1>
          <span className="pickup-text">
            {`Choose when ${name.firstName} will be picked up: at ${this.displayTime()}`}
          </span>
          <TimePicker 
            selectedTime={pickupTime}
            minHours={8}
            maxHours={16}
            onChange={changePickupTime}
          />
        </div>
          <div className="btn-group">
            <Link to="/childGroup">
              <Button 
                value="Close"
              />
            </Link>
            <Button 
              value={signInBtn}
              variant="success"
              disabled={isCheckingIn}
              onClick={checkinChild}
            />
          </div>
      </div>
    );
  }
}

ChildSignin.propTypes = {
	selectedChild: PropTypes.object,
	checkinChild: PropTypes.func,
  pickupTime: PropTypes.object,
  isCheckingIn: PropTypes.bool
}

export default ChildSignin;
