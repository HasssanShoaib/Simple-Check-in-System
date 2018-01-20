import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import ChildAvatar from '../../components/ChildAvatar';
import './childDetail.css';

class ChildDetail extends PureComponent {

  render() {
  	const { selectedChild, checkoutChild, isCheckingOut } = this.props;
  	const { childId, name, image, checkedIn, } = selectedChild;
    const signOutBtn = isCheckingOut ? 'Checking out...' : 'Sign out';

    return (
      <div className="page child-detail">
        <ChildAvatar 
        	id={childId}
					name={name.firstName}
					image={image.large}
					checkedIn={checkedIn}
					variant="large"
        />
        <div className="btn-group">
	        <Link to="/childGroup">
	        	<Button 
	        		value="Close"
	        	/>
	        </Link>
        	<Button 
        		value={signOutBtn}
        		variant="danger"
            disabled={isCheckingOut}
        		onClick={checkoutChild}
        	/>
        </div>
      </div>
    );
  }
}

ChildDetail.propTypes = {
	selectedChild: PropTypes.object,
	checkoutChild: PropTypes.func,
  isCheckingOut: PropTypes.bool
}

export default ChildDetail;
