import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import LoginModal from './auth/LoginModal';

class ContainerApp extends Component {
  render() {
    return (
      <Container>

      <Jumbotron className='mt-5 text-center'>
        <h3 className='display-3'>Hello!</h3>
        <p className='lead'>This is a simple ToDo App, where you can add, check or delete notes.</p>
        <hr className='my-2' />
        <p>It you want to start using this app, you have to login first.</p>
        <p className='lead'>
          <LoginModal/>
        </p>
      </Jumbotron>


      </Container>
    );
  }
}

export default ContainerApp;