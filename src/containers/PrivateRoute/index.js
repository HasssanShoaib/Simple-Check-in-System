import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { checkIfLogged } from '../../redux/modules/auth';

class PrivateRoute extends Component {

  render() {
    const { isLoggedIn, redirectTo, component: Component, ...rest } = this.props;

    return (
      <Route {...rest} render={(props) => (
        isLoggedIn
          ? <Component {...props} />
          : <Redirect to={{
              pathname: redirectTo
            }} />
      )} />
    )
  }
}

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired
}

const mapStateToProps = ({auth}) => {
  return {
    isLoggedIn: checkIfLogged(auth)
  }
}

export default connect(mapStateToProps)(PrivateRoute)