import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChildList from '../../components/ChildList';
import * as actionCreators from '../../redux/modules/children';
import './styles.css';

class ChildGroup extends PureComponent {

	componentDidMount() {
		if (!this.props.children) {
			this.handleFetchChildren();
		}
	}

	handleFetchChildren = () => {
		const { accessToken, fetchChildren } = this.props;
	  fetchChildren(accessToken);
	}

	render() {
	  return (
	    <div className="page-wrapper">
	    	<ChildList 
					children={this.props.children}
					keyField="childId"
				/>
	    </div>
	  );
	}
}

ChildGroup.propTypes = {
	children: PropTypes.object,
	accessToken: PropTypes.string,
	isFetching: PropTypes.bool,
	fetchChildren: PropTypes.func
}

const mapStateToProps = ({children, auth}) => {
	return {
		children: children.children,
		accessToken: auth.accessToken,
	  isFetching: children.isFetching	
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildGroup);
