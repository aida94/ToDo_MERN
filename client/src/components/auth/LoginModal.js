import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { login, googleOauth, facebookOauth } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

library.add(faFacebookF, faGoogle, faGithub); 

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: '',
      msg: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    googleOauth: PropTypes.func.isRequired,
    facebookOauth: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    // check if there is new error after update
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === 'LOGIN_FAIL') {
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
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    // Create user object
    const user = {
      email,
      password,
    };

    // attempt to login
    this.props.login(user);
  }

  oauthFacebook = (res) => {
    this.props.facebookOauth(res.accessToken);
  }

  oauthGoogle = (res) => {
    this.props.googleOauth(res.accessToken);
  }

  oauthGithub = () => {
    console.log('github');
  }


  render() {
    return (
      <Fragment>
        <NavLink onClick={this.toggle} className='cursorPointer'>
          <strong>Login</strong>
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Login User
          </ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : '' }
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

            <span>Sign in with </span>

            <FacebookLogin 
              appId='957055597958981'
              autoLoad={false}
              textButton={<FontAwesomeIcon icon={['fab', 'facebook-f']} />}
              fields='name,email,picture'
              onClick={this.oauthFacebook}
              callback={this.oauthFacebook}
              cssClass='btnIcon facebookIcon'
            />

            <GoogleLogin
              clientId='268327355096-tpfie0obavhpb9j9auc3plf5r6ntospg.apps.googleusercontent.com'
              onSuccess={this.oauthGoogle}
              onFailure={this.oauthGoogle}
            />  

            <span className='btnIcon githubIcon' onClick={this.oauthGithub} href='https://github.com/login/oauth/authorize?client_id=ebd1328f3e1b75969fd7'> 
              <FontAwesomeIcon icon={['fab', 'github']} />
            </span>   

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

export default connect(mapStateToProps, { login, googleOauth, facebookOauth, clearErrors })(LoginModal);
