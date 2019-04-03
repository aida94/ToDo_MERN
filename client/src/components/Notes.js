import React, { Component, Fragment } from 'react';
import {
  Card, 
  Button, 
  CardHeader,
  CardFooter, 
  CardBody,
  ListGroup, 
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { getNotes, addNote, deleteNote } from '../actions/noteActions'
import { clearErrors } from '../actions/errorActions';
import PropTypes from 'prop-types';

class Notes extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      note: '',
      msg: null
    };
  };

  static propTypes = {
    getNotes: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired,
    note_added: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount(){
    this.props.getNotes();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if(error !== prevProps.error) {
        //Check for add error
        if(error.id === 'ADD_NOTE_FAIL') {
            this.setState({ msg: error.msg.msg });
        }else {
            this.setState({ msg: null });
        }
    }

    // if authenticated close modal
    if(this.state.modal && this.props.note_added) {
      this.toggle();
      this.props.getNotes();
    }
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal,
      note: ''
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDeleteClick = (id) => {
    this.props.deleteNote(id);
  }

  onSubmit = e => {
    e.preventDefault();
    const newNote= {
      note: this.state.note
    }

    // Add note via addNote action
    this.props.addNote(newNote);
  };

  render() {
    const { notes } = this.props.note;
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
            { this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert>: '' }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='note'>Note Name</Label>
                <Input type='text' name='note' id='note' placeholder={this.state.note} className='mb-3' onChange={this.onChange}/>
                <Button color='warning' className='mt-4' block> Add </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>


        <div className='row mt-4'>
          {notes.map(({_id, note}) => (
            <div key={_id} className='col-3 mb-4'>
              <Card outline color='warning' className='m-2'>
                <CardHeader className='list-group-item-warning'>{note}</CardHeader>
                <CardBody>
                  <ListGroup flush>
                    <ListGroupItem>item1</ListGroupItem>
                    <ListGroupItem>item2</ListGroupItem>
                  </ListGroup>
                </CardBody>
                <CardFooter className='list-group-item-warning'>
                  <a className='cardLink' href={'/note/' + _id}>Show more</a> / <a className='cardLink' href='' onClick={this.onDeleteClick.bind(this, _id)}>Remove Note</a>
                </CardFooter>
              </Card>
            </div>
          ))} 

        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  note: state.note,
  note_added: state.note.note_added,
  error: state.error
});

export default connect(mapStateToProps, { getNotes, addNote, deleteNote, clearErrors })(Notes);