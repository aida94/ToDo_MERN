import React, { Component, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { login} from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: '',
      msg: null
    };
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    // check if there is new error after update
    if(error !== prevProps.error) {
      // Check for login error
      if(error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      }else {
        this.setState({ msg: null });
      };
    };

    // if authenticated close modal
    if(this.state.modal && isAuthenticated) {
      this.toggle();
    };
  };
    
  toggle = () => {
    // clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    // Create user object
    const user = {
      email,
      password
    };

    // attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.toggle} href='#login'>
          <strong>Login</strong>
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Login User
          </ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert>: '' }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Email' className='mb-3' onChange={this.onChange}/>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='Password' className='mb-3' onChange={this.onChange}/>
                <Button color='primary' className='mt-4' block> Login </Button>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <p className='d-flex justify-content-start'>
              If you don't have an account, please &nbsp; <a href='#register'> Register </a>
            </p>  
          </ModalFooter>
        </Modal>

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);