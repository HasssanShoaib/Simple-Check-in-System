import axios from 'axios';
import { push } from 'react-router-redux'

import { arrayToObject } from '../../helpers/converter';
import { encodeData } from '../../helpers/query';
import { LOGOUT } from './auth';
import { FAMLY_GROUP_ID, FAMLY_INSTITUTION_ID } from '../../constants/authentication';

const CHILDREN_FETCH = 'famly-signin/children/CHILDREN_FETCH';
const CHILDREN_FETCH_SUCCESS = 'famly-signin/children/CHILDREN_FETCH_SUCCESS';
const CHILDREN_FETCH_FAIL = 'famly-signine/children/CHILDREN_FETCH_FAIL';

const CHILD_CHECKOUT = 'famly-signin/children/CHILD_CHECKOUT';
const CHILD_CHECKOUT_SUCCESS = 'famly-signin/children/CHILD_CHECKOUT_SUCCESS';
const CHILD_CHECKOUT_FAIL = 'famly-signine/children/CHILD_CHECKOUT_FAIL';

const CHILD_CHECKIN = 'famly-signin/children/CHILD_CHECKIN';
const CHILD_CHECKIN_SUCCESS = 'famly-signin/children/CHILD_CHECKIN_SUCCESS';
const CHILD_CHECKIN_FAIL = 'famly-signine/children/CHILD_CHECKIN_FAIL';

const PICKUP_CHANGE = 'famly-signin/children/PICKUP_CHANGE';

const initialState = {
  children: null,
  pickupTime: {
  	hours: 8,
  	minutes: 0
  },
  isFetching: false,
  isCheckingOut: false,
  isCheckingIn: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHILDREN_FETCH:
      return {
        ...state,
        isFetching: true
      };
    case CHILDREN_FETCH_SUCCESS:
      return {
        ...state,
        children: action.children,
        isFetching: false,
      };
    case CHILDREN_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case CHILD_CHECKOUT:
      return {
        ...state,
        isCheckingOut: true
      };
    case CHILD_CHECKOUT_SUCCESS:
      return {
        ...state,
        isCheckingOut: false,
        children: action.children
      };
    case CHILD_CHECKOUT_FAIL:
      return {
        ...state,
        isCheckingOut: false,
        error: action.error
      };

    case CHILD_CHECKIN:
      return {
        ...state,
        isCheckingIn: true,
      };
    case CHILD_CHECKIN_SUCCESS:
      return {
        ...state,
        isCheckingIn: false,
        children: action.children,
        pickupTime: initialState.pickupTime
      };
    case CHILD_CHECKIN_FAIL:
      return {
        ...state,
        isCheckingIn: false,
        error: action.error
      };

    case PICKUP_CHANGE: {
    	return {
	    	...state,
	    	pickupTime: { 
	    		...state.pickupTime,
	    		...action.timeChange
	    	}
    	}
    }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

// action creators
export const fetchChildren = (accessToken) => (dispatch) => {

  dispatch({ type: CHILDREN_FETCH });

  const queryParams = {
    accessToken,
    groupId: FAMLY_GROUP_ID, 
    institutionId: FAMLY_INSTITUTION_ID
  }
  const queryString = encodeData(queryParams);

  axios.get('https://tryfamly.co/api/daycare/tablet/group?'+queryString)
  .then(({data}) => {
    dispatch({
      type: CHILDREN_FETCH_SUCCESS,
      children: arrayToObject(data.children, 'childId')
    });
  })
  .catch((error) => {
    dispatch({
      type: CHILDREN_FETCH_FAIL,
      error: {
      	...error,
      	message: 'Failed to load the children.'
      }
    });
  });
}

export const checkinChild = (childId, pickupTime, accessToken) => (dispatch, getState) => {

	dispatch({ type: CHILD_CHECKIN });

	axios.post(`https://tryfamly.co/api/v2/children/${childId}/checkins`, {
		accessToken,
		pickupTime
	})
	.then(() => {
		const { hours, minutes } = pickupTime;
		const timeStr = hours + ":" + minutes;
		const updatedChildren = changeStatus(getState().children, childId, true, timeStr);
    dispatch({ type: CHILD_CHECKIN_SUCCESS, children: updatedChildren });
    dispatch(push('/childGroup'));
	})
	.catch((error) => {
		dispatch({ 
			type: CHILD_CHECKIN_FAIL, 
			error: {
      	...error,
      	message: 'Failed to check in the child.'
      }
		});
	});
}

export const checkoutChild = (childId, accessToken) => (dispatch, getState) => {

	dispatch({ type: CHILD_CHECKOUT });

	axios.post(`https://tryfamly.co/api/v2/children/${childId}/checkout`, {
		accessToken
	})
	.then(() => {
		const updatedChildren = changeStatus(getState().children, childId, false);
    dispatch({ type: CHILD_CHECKOUT_SUCCESS, children: updatedChildren })
    dispatch(push('/childGroup'));
	})
	.catch((error) => {
		dispatch({ 
			type: CHILD_CHECKOUT_FAIL, 
			error: {
      	...error,
      	message: 'Failed to check out the child.'
      }
		});
	});
}

export const changePickupTime = (timeChange) => {
	return {
		type: PICKUP_CHANGE,
		timeChange
	}
}

// selectors
export const getSelectedChild = (state, childId) => {
  return state.children ? state.children[childId] : null;
}

const changeStatus = (state, childId, status, pickupTime) => {
	const selectedChild = getSelectedChild(state, childId);
	let updatedChild = {};
	updatedChild[childId] = {...selectedChild, checkedIn: status, pickupTime}
	
	return { ...state.children, ...updatedChild }
}