import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginModal from './auth/LoginModal';
import Notes from './notes/Notes';


class ContainerApp extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Container>

        { isAuthenticated 
          && <div className='my-5'>
            <h3 className='text-secondary'> Welcome, {user.username && user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h3>
            <Notes/>
          </div>
        }

        {!isAuthenticated
          && <Jumbotron className='mt-5 text-center'>
            <h3 className='display-3'>Hello!</h3>
            <p className='lead'>This is a simple ToDo App, where you can add, check or delete notes.</p>
            <hr className='my-2' />
            <p>It you want to start using this app, you have to login first.</p>
            <p className='lead'>
              <LoginModal/>
            </p>
          </Jumbotron>
        }

      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { })(ContainerApp);
