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
} from 'reactstrap';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
    
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.toggle} href='#login'>
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Login User
          </ModalHeader>
          <ModalBody>
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
              If you don't have an account, please <a href='#register'> Register </a>
            </p>  
          </ModalFooter>
        </Modal>

      </Fragment>
    );
  }
}

export default LoginModal;