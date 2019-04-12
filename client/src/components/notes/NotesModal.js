import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNote } from '../../actions/noteActions';
import { clearErrors } from '../../actions/errorActions';


class NotesModal extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      note: '',
      msg: null,
    };
  }

  static propTypes = {
    addNote: PropTypes.func.isRequired,
    note_added: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for add error
      if (error.id === 'ADD_NOTE_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // if authenticated close modal
    if (this.state.modal && this.props.note_added) {
      this.toggle();
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal,
      note: '',
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const newNote = {
      note: this.state.note,
    };

    // Add note via addNote action
    this.props.addNote(newNote);
  }

  render() {
    return (
      <Fragment>
        <Button outline color='warning' className='mt-4' onClick={this.toggle}>
          Take a note ...
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add Note
          </ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : '' }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='note'>Note Name</Label>
                <Input type='text' name='note' id='note' placeholder={this.state.note} className='mb-3' onChange={this.onChange}/>
                <Button color='warning' className='mt-4' block> Add </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  note_added: state.note.note_added,
  error: state.error,
});

export default connect(mapStateToProps, { addNote, clearErrors })(NotesModal);
