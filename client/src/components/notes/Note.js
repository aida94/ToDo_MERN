import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardFooter, CardBody, ListGroup, ListGroupItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteNote } from '../../actions/noteActions';
import { getNoteItems } from '../../actions/itemActions';


class Note extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  static propTypes = {
    getNoteItems: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getNoteItems();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  onDeleteClick = (id) => {
    this.props.deleteNote(id);
  }

  render() {
    const { items } = this.props.item;
    return (
      <Fragment>
        <div className='col-3 mb-4'>
          <Card outline color='warning' className='m-2'>
            <CardHeader className='list-group-item-warning'>{this.props.note.charAt(0).toUpperCase() + this.props.note.slice(1)}</CardHeader>
            <CardBody>
              <ListGroup flush>
                { items 
                && items.filter(item => (
                  item.note_id === this.props.id && item.is_checked === false))
                  .map(item => (
                    <ListGroupItem key={item._id}>{item.item}</ListGroupItem>)).slice(0, 2)
                }
              </ListGroup>
            </CardBody>
            <CardFooter className='list-group-item-warning'>
              <Link to={`/note/${this.props.id}`} className='cardLink'>Show more</Link>
              /
              <NavLink className='cardLink' onClick={this.toggle}> Remove Note </NavLink>
            </CardFooter>
          </Card>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modalContent'>
          <ModalHeader toggle={this.toggle} >
            Delete Confirmation
          </ModalHeader>
          <ModalBody>
            <h6> Are you sure you want to delete <b>{this.props.note.charAt(0).toUpperCase() + this.props.note.slice(1)}</b> ?</h6>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.onDeleteClick.bind(this, this.props.id)}>Yes</Button>
            <Button color="secondary" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>

      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(mapStateToProps, { getNoteItems, deleteNote })(Note);
