import React, { Component } from 'react';
import { NavLink } from 'reactstrap';

class Logout extends Component {
  render() {
    return (
      <NavLink href='#logout'>
        Logout
      </NavLink>
    );
  }
}

export default Logout;