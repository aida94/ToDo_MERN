import React, { Component } from 'react';
import { Container, Jumbotron, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginModal from './auth/LoginModal';
import Notes from './notes/Notes';


class ContainerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.note.noteMessage._id !== this.props.note.noteMessage._id) {
      this.setState({ visible: true });
      this.interval = setTimeout(() => this.onDismiss(), 3000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { note } = this.props.note.noteMessage;

    return (
      <Container>

        {note && <Alert isOpen={this.state.visible} toggle={this.onDismiss} color="success"> {note} successfully added </Alert>}

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
  note: state.note,
  item: state.note,
});

export default connect(mapStateToProps, { })(ContainerApp);
