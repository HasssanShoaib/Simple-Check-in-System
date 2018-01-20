import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChildDetail from './ChildDetail';
import ChildSignin from './ChildSignin';
import { getSelectedChild } from '../../redux/modules/children';
import * as actionCreators from '../../redux/modules/children';
import './styles.css';

class Child extends PureComponent {

	componentDidMount() {
		if (!this.props.children) {
			// this.handleFetchChildren();
		}
	}

	handleFetchChildren = () => {
		const { accessToken, fetchChildren } = this.props;
	  fetchChildren(accessToken);
	}

	handleSignout = () => {
		const { accessToken, selectedChild, checkoutChild } = this.props;
		checkoutChild(selectedChild.childId, accessToken);
	}

	handleSignin = () => {
		const { accessToken, selectedChild, pickupTime, checkinChild } = this.props;
		checkinChild(selectedChild.childId, pickupTime, accessToken);
	}

  render() {
  	const { changePickupTime, selectedChild, pickupTime, 
  		isCheckingIn, isCheckingOut } = this.props;
  		
    return (
    	selectedChild.checkedIn 
    		?	<ChildDetail 
    				selectedChild={selectedChild}
						checkoutChild={this.handleSignout}
						isCheckingOut={isCheckingOut}
    			/>
    		: <ChildSignin
    				selectedChild={selectedChild}
						checkinChild={this.handleSignin}
						changePickupTime={changePickupTime}
						pickupTime={pickupTime}
						isCheckingIn={isCheckingIn}
    			/>
    );
  }
}

Child.propTypes = {
	isFetching: PropTypes.bool,
	selectedChild: PropTypes.object,
	accessToken: PropTypes.string,
	fetchChildren: PropTypes.func,
	pickupTime: PropTypes.object,
	isCheckingIn: PropTypes.bool,
	isCheckingOut: PropTypes.bool
}

Child.defaultProps = {
  pickupTime: {
    hours: 8,
    minutes: 0
  }
}

const mapStateToProps = ({children, auth}, props) => {
	const childId = props.match.params.id;
	const { pickupTime, isFetching, isCheckingIn, isCheckingOut } = children;

	return {
	  isFetching,
	  isCheckingIn,
		isCheckingOut,
		pickupTime,
		selectedChild: getSelectedChild(children, childId),
		accessToken: auth.accessToken,
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Child);
