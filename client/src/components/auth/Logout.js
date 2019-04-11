import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  }
  
  render() {
    return (
      <NavLink onClick={this.props.logout} className='cursorPointer'>
        <strong>Logout</strong>
      </NavLink>
    );
  }
}

export default connect(null, { logout })(Logout);
