import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import defaultAvatarImg from './default_avatar.jpg';
import './styles.css';

class ChildAvatar extends PureComponent {
  render() {
  	const { id, image, name, checkedIn, variant } = this.props;

    return (
    	<Link to={`/child/${id}`}>
	      <figure className={variant}>
	      	<div className="photo-container">
			      <img 
				      src={image}
				      alt="child"
				      className="child-photo"
			      />
			      { checkedIn &&
			      		<span className="status"></span>
			     	}
		      </div>
		      <figcaption className="child-name">{name}</figcaption>
	      </figure>
      </Link>
    );
  }
}

ChildAvatar.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	image: PropTypes.string,
	checkedIn: PropTypes.bool,
	variant: PropTypes.oneOf(['small', 'large'])
}

ChildAvatar.defaultProps = {
	image: defaultAvatarImg,
	checkedIn: false,
	variant: 'small'
}

export default ChildAvatar;