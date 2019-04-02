import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavbarApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {

    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <Logout/>
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal/>
        </NavItem>
        <NavItem>
          <LoginModal/>
        </NavItem>
      </Fragment>
    );

    return (
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">ToDo APP</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem> 
              { isAuthenticated ? authLinks : guestLinks }             
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  };
};

const mapStateToProps = (state) => ({
  auth: state.auth
}); 

export default connect(mapStateToProps, { })(NavbarApp);