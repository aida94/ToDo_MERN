import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  
  render() {
    return (
      <NavLink onClick={this.props.logout} href='#logout'>
        Logout
      </NavLink>
    );
  };
};

export default connect(null, { logout })(Logout);