import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: '',
      email: '',
      password: '',
      msg: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    // check if there is new error after update
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // if authenticated close modal
    if (this.state.modal && isAuthenticated) {
      this.toggle();
    }
  }
    
  toggle = () => {
    // clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = this.state;

    // Create new user object
    const newUser = {
      username,
      email,
      password,
    };

    // attempt to login
    this.props.register(newUser);
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.toggle}>
          <strong>Register</strong>
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Register new user
          </ModalHeader>
          <ModalBody>
          { this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : '' }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='username'>Username</Label>
                <Input type='text' name='username' id='username' placeholder='Username' className='mb-3' onChange={this.onChange}/>
                <Label for='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Email' className='mb-3' onChange={this.onChange}/>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='Password' className='mb-3' onChange={this.onChange}/>
                <Button color='secondary' className='mt-4' block> Register </Button>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <p className='d-flex justify-content-start'>
              If you have an account, please &nbsp; <a href='#login'> Login </a>
            </p>  
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
