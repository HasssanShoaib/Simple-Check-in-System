import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ChildAvatar from '../ChildAvatar';
import './styles.css';

class ChildList extends PureComponent {

	renderList = () => {
		const { children, keyField } = this.props;
		return ( 
			children &&
				Object.values(children).map((child) => (
		  		<ChildAvatar 
		  			key={child[keyField]}
		  			id={child.childId}
		  			name={child.name.firstName}
		  			image={child.image.small}
		  			checkedIn={child.checkedIn}
		  		/>
	  		))
		)
	}

  render() {
  	return (
  		this.renderList() 
  	)	
  }
}

ChildList.propTypes = {
	children: PropTypes.object,
	keyField: PropTypes.string.isRequired
}

ChildList.defaultProps = {
	keyField: 'childId'
}

export default ChildList;